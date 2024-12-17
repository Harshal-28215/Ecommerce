import React from 'react'

function Size_Material({ sizeAndFit, materialAndCare }: { sizeAndFit: string, materialAndCare: string }) {
    return (
        <div>
            <h1 className='flex gap-2 text-xl font-bold mt-7'>Size & Fit</h1>

            {sizeAndFit.split('\n').map((line,index)=>(
                <React.Fragment key={index}>
                    {line}
                    <br />
                </React.Fragment>
            ))}

            <h1 className='flex gap-2 text-xl font-bold mt-7'>Material & Care</h1>
            {materialAndCare.split('\n').map((line, index) => (
                <React.Fragment key={index}>
                    {line}
                    <br />
                </React.Fragment>
            ))}

        </div>
    )
}

export default Size_Material
