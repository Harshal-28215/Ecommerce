import React from 'react'

type specifications = {
    title: string,
    about: string,
    _id: string
}[]

function Specification({ specifications }: { specifications: specifications }) {
    return (
        <section>
            <h1 className='text-xl font-bold mt-6'>Specifications</h1>

            <div className='grid grid-cols-2 gap-2'>
                {specifications.map(data => (
                    <div className='space-y-1 py-3 border-b w-[300px] border-black/30' key={data._id}>
                        <p className='text-black/50 text-sm'>{data.title}</p>
                        <p>{data.about}</p>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default Specification
