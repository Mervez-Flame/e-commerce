import { LATEST } from "../assets/data"
import Image from "./Image"

const NewCollections = () => {
    return (
        <section className="bg-primary">
            <div className="max_padd_container py-12 xl:py-28 xl:w-[100%]">
                <h3 className="h3 text-center">Latest Products</h3>
                <hr className="h-[3px] md:w-[1/2] mx-auto bg-gradient-to-l from-transparent via-black to-transparent mb-16 " />
                {/* Container # */}
                <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
                    {LATEST.map((latest_product) => (
                        <Image key={latest_product.id} image={latest_product.image} name={latest_product.name} newPrice={latest_product.new_price} oldPrice={latest_product.old_price} />

                    ))}
                </div>
            </div>
        </section>
    )
}

export default NewCollections