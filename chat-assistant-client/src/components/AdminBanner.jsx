export default function AdminBanner() {
    return (
        <>
            <section className="flex flex-col items-center justify-center mx-auto max-md:mx-2 max-md:px-2 max-w-5xl w-full text-center rounded-2xl py-20 md:py-24 bg-[url('https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/banners/image-1.png')] bg-cover bg-center bg-no-repeat">
                <h1 className="text-2xl md:text-3xl font-medium text-white max-w-2xl">Empower Your Sales & Marketing with a Next-Gen AI Workforce</h1>
                <div className="h-[3px] w-32 my-1 bg-gradient-to-l from-transparent to-indigo-600"></div>
                <p className="text-sm md:text-base text-white max-w-xl">
                    Leverage AI Agents for real-time calling and unified multi-channel engagement, optimizing customer interactions at scale.
                </p>
            </section>
        </>
    );
};