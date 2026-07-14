import React, { useEffect, useState } from 'react'
import { Button, Form, message } from 'antd'
import { customRequiredMark } from '../../utils/RequiredMark'
import ReusableSelect from '../ReusableSelect'
import { addressRules, postCodeRule, selectRules, stateRule, streetNameRule, streetNumberRule, suburbRule } from '../../utils/schema'
import FormField from '../FormField'
import APIhandler from '../../client/APIhandler'
import ReusableButton from '../ReusableButton'
import { HomeTwoTone } from '@ant-design/icons'
import { propertyfor, propertyType } from '../../utils/KeyValues'
import PopOver from '../PopOver'


const AddProperty = ({ onClose }) => {
    const [form] = Form.useForm()
    const [agentOptions, setAgentOptions] = useState([])
    const [loadingOptions, setLoadingOptions] = useState(false)

    const [propertyDetails, setPropertyDetails] = useState({})

    useEffect(() => {
        const fetchAssignedOptions = async () => {
            setLoadingOptions(true)
            try {
                const responseData = await APIhandler('get', '/agency/agent/getActiveAgentDDL?agencyUID=ba137a8612994')
                const updatedData = responseData?.object?.map(({ disabled, text, value }) => ({
                    disabled,
                    label: text,
                    value,
                })) || []

                setAgentOptions(updatedData)
            } catch (error) {
                console.error('Error fetching assigned agents:', error)
            } finally {
                setLoadingOptions(false)
            }
        }

        fetchAssignedOptions()
    }, [])

    const onFinish = async () => {
        try {
            const values = await form.validateFields()
            setPropertyDetails(values)
            console.log(values)
            message.success('Property Added Successfully')
            setTimeout(() => {
                form.resetFields()
                setPropertyDetails({})
                onClose()
            }, 500);
        } catch (error) {
            message.error(error.message)
        }
    }

    const handleCancel = () => {
        form.resetFields()
        onClose()
    }

    return (
        <PopOver>
            <div className='flex items-center justify-between'>
                <div className='flex items-center gap-2'>
                    <HomeTwoTone className='text-3xl' />
                    <h2 className='text-[22px] font-semibold! text-[#001524] mt-3!'>Add Property</h2>
                </div>
                <Button type='text' onClick={onClose}>
                    ✕
                </Button>
            </div>

            <Form
                form={form}
                layout='vertical'
                onFinish={onFinish}
                className='mt-4 text-sm text-[#495057]'
                requiredMark={customRequiredMark}
            >
                <ReusableSelect label='Property Type' name='PropertyType' placeholder='Select Property Type'
                    rules={selectRules}
                    options={propertyType}
                />

                <FormField label='Address' name='Address' placeholder='Enter your address' rules={addressRules} />

                <div className='grid grid-cols-2 gap-2 mb-4'>
                    <FormField label='Unit Number' name='UnitNumber' placeholder='Unit Number' />
                    <FormField label='Street Number' name='StreetNumber' placeholder='Street Number' rules={streetNumberRule} />
                    <FormField label='Street Name' name='StreetName' placeholder='Street Name' rules={streetNameRule} />
                    <FormField label='Suburb' name='Suburb' placeholder='suburb' rules={suburbRule} />
                </div>

                <FormField label='State' name='State' placeholder='Enter your state' rules={stateRule} />
                <FormField label='Post Code' name='PostCode' placeholder='Enter your post code' rules={postCodeRule} />

                <ReusableSelect label='Assigned To' name='AssignedTo' placeholder='Assigned To' rules={selectRules} options={agentOptions} loading={loadingOptions} />
                <ReusableSelect label='Property For' name='PropertyFor' placeholder='Property For' rules={selectRules} options={propertyfor} loading={loadingOptions} />

                <FormField label='Key No' name='KeyNo' placeholder='Key No' />

                <div className='flex justify-end items-center gap-2'>
                    <ReusableButton content='Cancel' cancel onClick={handleCancel} />
                    <ReusableButton type='primary' htmlType='submit' content='Save' />
                </div>
            </Form>
        </PopOver>
    )
}

export default AddProperty
