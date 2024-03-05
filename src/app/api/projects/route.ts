import { createNewProject } from "@/app/(defaults)/test/_components/action";
import prisma from "@/lib/prisma";
import { getCurrentUser } from "@/lib/session";
import { NextResponse } from "next/server";
import { z } from "zod";

export type Project = {
  title: string;
  description: string;
};

export const ProjectSchema = z.object({
  title: z
    .string({
      required_error: "Title is required",
    })
    .min(3, {
      message: "Project title must be atleast 3 characters",
    }),
  description: z
    .string({
      required_error: "Description is required",
    })
    .min(3, {
      message: "Description  must be atleast 3 characters",
    }),
});

function validateSchema(data: Project) {
  try {
    const parseData = ProjectSchema.parse(data);
    return parseData;
  } catch (error: any) {
    if (error.issues && error.issues.length > 0) {
      const validationErrors = error.issues.map((issue: any) => ({
        path: issue.path.join('.'),
        message: issue.message
      }))
      throw new Error(JSON.stringify(validationErrors))
    }
    throw new Error(error.message)
  }
}

export async function POST(request: Request) {
  const session = await getCurrentUser()
  try {
    if (!session) {
      const json = await request.json();
      const jsonValidated = validateSchema(json);
      const createNewProjectResult = await createNewProject(jsonValidated);

      // const { title, description } = await request.json();
      // const newProject = await prisma.arh_project.create({
      //   data: {
      //     title: title,
      //     description: description,
      //   },
      // });
      console.log(createNewProjectResult)
      return NextResponse.json({ status: 200, results: createNewProjectResult });

    }
    return NextResponse.json({ status: 401, results: "Not Admin" });



  } catch (error: any) {
    let errorMessage;
    try {
      errorMessage = JSON.parse(error.message)
    } catch (parseError) {
      errorMessage = error.message
    }
    return NextResponse.json({ status: 500, results: errorMessage })
  }
}