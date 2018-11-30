import React from 'react'
import {FormInput} from 'react-form'

export const withReactFromField = InputComponent => (props) => {
  const {field, onChange, ...rest} = props
  return (
    <FormInput field={field}>
      {({setValue, getValue, setTouched}) => {
        return (
          <InputComponent
            content={getValue()}
            value={getValue()}
            onChange={val => {
              setValue(val)
              setTouched()

              onChange && onChange(val)
            }}
            {...rest}
          />
        )
      }}
    </FormInput>
  )
}
