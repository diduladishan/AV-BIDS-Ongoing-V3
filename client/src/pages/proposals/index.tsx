import Breadcrumbs from "../../components/Breadcrumbs";
import ProposalsTable from "./components/table";

export function Index() {
  return (
    // <div className="container mx-auto">
    <div className='sm:container sm:mx-auto '>
      <div className='mb-4'>
        <Breadcrumbs />
      </div>
      <section className='bg-[#fff] px-8 py-8 rounded-xl drop-shadow-md min-w-max mx-2'>
        <h2 className='text-[20px] font-semibold mb-6'>Proposals</h2>
        <ProposalsTable />
      </section>
    </div>
  );
}

export default Index;
