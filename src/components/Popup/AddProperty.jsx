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
import { styles } from '../../utils/Styles'
import FrequencyPopup from './FrequencyPopup'


const AddProperty = ({ onClose }) => {
    const [form] = Form.useForm()
    const [agentOptions, setAgentOptions] = useState([])
    const [loadingOptions, setLoadingOptions] = useState(false)
    const [activeTab, setActiveTab] = useState(0)
    const [propertyDetails, setPropertyDetails] = useState({})
    const [frequencyOption, setFrequencyOption] = useState(false)
    const [prevPropertyFor, setPrevPropertyFor] = useState('')


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
            await form.validateFields()
            const currentValues = form.getFieldsValue(true)
            setPropertyDetails(prev => ({ ...prev, ...currentValues }))
            message.success('Property Added Successfully')
            setTimeout(() => {
                form.resetFields()
                setPropertyDetails({})
                onClose()
            }, 500);
        } catch (error) {
            message.error(error?.errorFields?.[0]?.errors?.[0] || 'Please complete the required fields')
        }
    }

    const handleCancel = () => {
        form.resetFields()
        onClose()
    }

    const handleNext = async () => {
        try {
            await form.validateFields()
            setActiveTab(1)
        } catch (error) {
            message.error(error?.errorFields?.[0]?.errors?.[0] || 'Please complete the required fields')
        }
    }

    const handleFormChange = (_, allValues) => {
          const currentValues = form.getFieldsValue(true)
          setPropertyDetails(prev => ({ ...prev, ...currentValues }))

          if (allValues.PropertyFor === 'rental' && prevPropertyFor !== 'rental') {
            setFrequencyOption(true)
          }

          setPrevPropertyFor(allValues.PropertyFor)
    }

    return (
        <PopOver>

            <div className='w-full max-h-[90vh] h-auto my-auto overflow-y-scroll no-scrollbar max-w-xl rounded-2xl bg-white p-6 shadow-xl'>
                
                {/* Sub heading */}
                <div className='flex items-center justify-between'>
                    <div className='flex items-center gap-2'>
                        <HomeTwoTone className='text-2xl md:text-3xl align-middle!' />
                        <span className='text-[18px] md:text-[22px] font-semibold text-[#001524] leading-none'>Add Property</span>
                    </div>
                    <Button type='text' onClick={onClose}>
                        ✕
                    </Button>
                </div>

                <div className='p-2 w-full grid grid-cols-2'>
                    <ReusableButton type='default' style={styles['full-change-btn-active']} content='Address' onClick={() => setActiveTab(0)} />
                    <ReusableButton type='default' style={activeTab === 1 ? styles['full-change-btn-active'] : styles['full-change-btn']} content='Property Information' onClick={() => setActiveTab(1)} />
                </div>
                
                {/* Form */}
                <Form
                    form={form}
                    layout='vertical'
                    onFinish={onFinish}
                    onValuesChange={handleFormChange}
                    className='mt-4 text-sm text-[#495057]'
                    requiredMark={customRequiredMark}
                >

                    {activeTab === 0 &&
                        <>
                            <div className='grid grid-cols-2 gap-2 mb-4'>
                                <FormField label='Unit Number' name='UnitNumber' placeholder='Unit Number' />
                                <FormField label='Street Number' name='StreetNumber' placeholder='Street Number' rules={streetNumberRule} />
                                <FormField label='Street Name' name='StreetName' placeholder='Street Name' rules={streetNameRule} />
                                <FormField label='Suburb' name='Suburb' placeholder='suburb' rules={suburbRule} />
                            </div>

                            <FormField label='State' name='State' placeholder='Enter your state' rules={stateRule} />
                            <FormField label='Post Code' name='PostCode' placeholder='Enter your post code' rules={postCodeRule} />

                            <div className='flex justify-end'>
                                <ReusableButton type='primary' style={styles['primary-btn']} htmlType='button' onClick={handleNext} content='Next' />
                            </div>
                        </>
                    }

                    {activeTab === 1 && <>
                        <ReusableSelect label='Property Type' name='PropertyType' placeholder='Select Property Type'
                            rules={selectRules}
                            options={propertyType}
                        />

                        <FormField label='Address' name='Address' placeholder='Enter your address' rules={addressRules} />

                        <ReusableSelect label='Assigned To' name='AssignedTo' placeholder='Assigned To' rules={selectRules} options={agentOptions} loading={loadingOptions} />

                        <div className='grid grid-cols-2 gap-2 mt-9!'>
                            <ReusableSelect label='Property For' name='PropertyFor' placeholder='Property For' rules={selectRules} options={propertyfor} loading={loadingOptions} />

                            <FormField label='Key No' name='KeyNo' placeholder='Key No' />
                        </div>

                        <div className='flex justify-end items-center gap-2'>
                            <ReusableButton content='Cancel' style={styles['normal-btn']} onClick={handleCancel} />
                            <ReusableButton type='primary' style={styles['primary-btn']} htmlType='submit' content='Save' />
                        </div>
                    </>}



                </Form>
            </div>
            {frequencyOption && <FrequencyPopup onClose={() => setFrequencyOption(false)} onSave={(values) => {
                setPropertyDetails(prev => ({ ...prev, ...values }))
                setFrequencyOption(false)
            }} />}

        </PopOver >
    )
}

export default AddProperty
