import { FilterSideBar } from "@/components/Aside/Aside"
import { Outlet } from "react-router-dom"

export const ProductPage = () => {
  return (
    <section className="flex flex-col lg:flex-row min-h-screen mt-40">
      <div className="lg:w-64 lg:flex-shrink-0">
        <FilterSideBar />
      </div>
      <div className="flex-1 lg:flex-grow">
        <Outlet />
      </div>
    </section>
  );
};