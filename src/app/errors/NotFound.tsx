import Layout from '../layout/Layout';

export default function NotFoundPage() {
  return (
    <Layout className='py-20  w-full h-full min-h-screen flex items-center justify-center'>
      <div className='flex flex-col items-center justify-center'>
        <div className='inline-flex font-Montserrat text-[10rem] lg:text-[16rem] text-center leading-none'>
          404
        </div>
        <p className='font-Oswald text-3xl lg:text-5xl font-thin text-center uppercase  rounded-md py-2 px-5'>
          <span className=' font-semibold mr-2'>désolé, </span>
          <span>Page introuvable</span>
        </p>
      </div>
    </Layout>
  );
}
