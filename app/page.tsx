
import db from "@/lib/db";
import { CategoryForm } from "./components/CategoryForm";
export default async function Home() {
  const categories = await db.category.findMany();

  return (
    <section className="flex items-center bg-blue-100 w-full min-h-screen">
    <div className="container flex flex-col items-center md:items-start space-y-4">
      <h1 className="font-bold text-blue-700 max-w-xl text-center md:text-start text-5xl md:text-6xl ">
        Book a visit to your favorite place:
      </h1>
      <CategoryForm categories={categories}/>
    </div>
    </section>
  );
}
