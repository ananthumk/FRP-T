import React from 'react'

export const styles = {
    label: 'font-inter mt-1.5 mb-1.5 text-[16px] font-normal text-gray-600',
    input: 'w-full font-outfit min-h-12 py-2.5 px-3.75 rounded-xl bg-white border border-solid border-[#cbd5e1] text-[#1e293b] text-[15px] outline-[#0e7090] ',
    errors: 'text-[13px] font-inter ml-1 text-red-500 top-0 mb-2'
}

const FormField = ({ formik, name, label, type = 'text', placeholder }) => (
    <div className='flex flex-col gap-1'>
        <label htmlFor={name} className={styles.label}>{label}</label>
        <div>
            <input
                type={type}
                id={name}
                name={name}
                value={formik.values[name]}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder={placeholder}
                className={styles.input}
            />

            {/* vaildation - Errors */}
            {formik.touched[name] && formik.errors[name] && <p className={styles.errors}>{formik.errors[name]}</p>}
        </div>
    </div>
)

export default FormField