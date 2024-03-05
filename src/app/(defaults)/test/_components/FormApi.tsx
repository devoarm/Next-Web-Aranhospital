"use client";

import { API_URL } from "@/lib/url";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { DataType } from "@/types/data.type";
import { toast } from "sonner";
// import { revalidatePath } from "next/cache";

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

export default function ProjectFormAPI() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Project>({
    resolver: zodResolver(ProjectSchema),
  });
  async function handleFormSubmit(values: Project) {
    console.log(values);
    setLoading(true);
    try {
      setLoading(true);
      const response: DataType = await axios.post(
        `${API_URL}/projects`,
        values
      );
      if (response.data.status == 200) {
        toast.success("สำเร็จ", {
          description: "",
        });
      } else if (response.data.status == 401) {
        toast.warning("Warning", {
          description: "คุณไม่ใช่ผู้ดูแลระบบ",
        });
      } else if (response.data.status == 500) {
        toast.warning("Warning", {
          description: response.data.results,
        });
      } else {
        toast.error("Error", {
          description: "ไม่สำเร็จ",
        });
      }
      router.refresh();
    } catch (error: any) {
      toast.error("เกิดข้อผิดพลาด", {
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="space-y-6" onSubmit={handleSubmit(handleFormSubmit)}>
      <h5 className="text-xl font-medium text-gray-900 dark:text-white">
        Create New Project - API
      </h5>
      <div>
        <label
          htmlFor="title"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Title
        </label>
        <input
          {...register("title")}
          type="text"
          name="title"
          id="title"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
          placeholder="project name"
        />
        {errors.title && (
          <p className="text-red-500 text-sm mt-2">{errors.title.message}</p>
        )}
      </div>
      <div>
        <label
          htmlFor="description"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Project Description
        </label>
        <textarea
          {...register("description")}
          id="description"
          rows={4}
          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Write your thoughts here..."
        ></textarea>
        {errors.description && (
          <p className="text-red-500 text-sm mt-2">
            {errors.description.message}
          </p>
        )}
      </div>

      {loading ? (
        <button
          disabled
          className="flex items-center w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          <Loader className="animate-spin mr-2" />
          Creating please wait ...
        </button>
      ) : (
        <button
          type="submit"
          className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Create Project
        </button>
      )}
    </form>
  );
}