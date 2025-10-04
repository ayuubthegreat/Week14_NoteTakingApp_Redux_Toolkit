import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Save } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { noteSchema } from "../schema/notes";
import { useDispatch } from "react-redux";
import { addNote } from "../store/slices/notesSlice";

const CreateNoteForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(noteSchema),
    defaultValues: {
      title: "",
      content: "",
    },
  });

  const sendToTheServer = async (data) => {
    setIsSubmitting(true);
    try {
      dispatch(addNote(data)).unwrap();
      // Briefly show success state
      setTimeout(() => {
        navigate("/notes");
      }, 500);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form
      className="bg-white p-6 rounded-lg shadow-sm max-w-2xl mx-auto"
      onSubmit={handleSubmit(async (data) => {
        await sendToTheServer(data);
        reset();
      })}
    >
      <h2 className="text-xl font-semibold mb-6 text-gray-800">
        Create a New Note
      </h2>

      <div className="mb-4">
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Title
        </label>
        <input
          id="title"
          type="text"
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 ${
            errors.title ? "border-red-500" : "border-gray-300"
          }`}
          placeholder="Note Title"
          {...register("title")}
        />
        {errors.title && (
          <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
        )}
      </div>

      <div className="mb-6">
        <label
          htmlFor="content"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Content
        </label>
        <textarea
          id="content"
          rows={6}
          className={`w-full px-3 py-2 border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-yellow-400 ${
            errors.content ? "border-red-500" : "border-gray-300"
          }`}
          placeholder="Write your note here..."
          {...register("content")}
        />
        {errors.content && (
          <p className="mt-1 text-sm text-red-600">{errors.content.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded-md transition-colors duration-200 flex items-center justify-center gap-2 disabled:opacity-70"
      >
        <Save size={18} />
        <span>{isSubmitting ? "Saving..." : "Save Note"}</span>
      </button>
    </form>
  );
};

export default CreateNoteForm;
