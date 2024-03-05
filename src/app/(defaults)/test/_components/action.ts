"use server";

import prisma from "@/lib/prisma";
import { Project } from "./FormActions";
import { revalidatePath } from 'next/cache'
import { NextResponse } from "next/server";

export async function createNewProject(values: Project) {

    try {
        const newProject = await prisma.arh_project.create({
            data: {
                title: values.title,
                description: values.description,
            }
        });
        
        if (!newProject) {
            throw Error("Failed to create project");
        }
        
        if (newProject) {
            console.log(newProject);
            return newProject;
        }
        
        return null;
    } catch (error: any) {
        console.log(error.message);
      }
    }


export async function getAllProjects() {
    const projects = await prisma.arh_project.findMany();
    console.log(projects);
    revalidatePath("/");
    return projects;
}

