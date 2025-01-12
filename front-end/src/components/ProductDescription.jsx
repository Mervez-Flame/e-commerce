import React from 'react';

const ProductDescription = () => {
    return (
        <div className='mt-20'>
            <div className='flex gap-3 mb-4'>
                <button className='btn_dark_rounded !rounded-none !text-xs !py-[6px] w-36'>Description</button>
                <button className='btn_dark_outline !rounded-none !text-xs !py-[6px] w-36'>Care Guide</button>
                <button className='btn_dark_outline !rounded-none !text-xs !py-[6px] w-36'>Size Guide</button>
            </div>
            <div className='flex flex-col pb-16'> 
                <p className='text-sm'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus sit tempora debitis et. Itaque autem aliquid voluptatibus, minus, praesentium voluptas iste dignissimos atque laborum dolore voluptatem consequuntur velit at magnam. Odit temporibus fugiat incidunt dolorum impedit eos quaerat voluptates nisi, doloremque et non reiciendis, debitis eveniet consequuntur numquam quod esse, sequi voluptatem quas aperiam vel?</p>
                <p className='text-sm'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis nihil deleniti deserunt illum nesciunt incidunt soluta commodi doloremque eum! Unde commodi animi fuga tempore laboriosam aliquid harum voluptatum.</p>
                <p className='text-sm'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus minima vero totam facilis fugit eveniet dolore error aut. Enim amet velit perferendis, dolores maxime molestias dolorum minus vitae aliquam distinctio aperiam iste alias magnam quae voluptates iure? Ex.</p>
            </div>
        </div>
    );
}

export default ProductDescription;
