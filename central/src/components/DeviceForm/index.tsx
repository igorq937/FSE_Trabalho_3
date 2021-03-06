import { useCallback, useEffect, useMemo } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Stack
} from '@chakra-ui/react'

import { MQTT_TOPICS } from '@constants/topics'
import { useDevices } from '@contexts/Devices'

import { OutputForm } from './OutputForm'

export type FormValues = {
  room: string
  inputName: string
  outputName?: string
  state?: number
  alarm?: boolean
}

export const DeviceForm = () => {
  const {
    publishMessages,
    addDevice,
    toggleForm,
    currentMac,
    initialFormValues
  } = useDevices()

  const methods = useForm<FormValues>({
    defaultValues: useMemo(() => initialFormValues, [initialFormValues])
  })

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = methods

  useEffect(() => {
    reset(initialFormValues)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialFormValues])

  const onSubmit = useCallback(
    (data: FormValues) => {
      console.log(data)
      publishMessages(
        ('/fse2021/180122258/dispositivos/' + currentMac) as MQTT_TOPICS.DEVICE,
        JSON.stringify({ ...data, mode: 'register-esp' })
      )
      addDevice({
        inputState: 0,
        outputState: 0,
        battery: false,
        ...data,
        mac: currentMac
      })
      toggleForm(false)
      reset()
    },
    [addDevice, currentMac, publishMessages, reset, toggleForm]
  )

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl isInvalid={Object.keys(errors).length > 0}>
          <Stack spacing={4}>
            <Box>
              <FormLabel htmlFor="room" margin={0}>
                Room
              </FormLabel>
              <Input
                id="room"
                placeholder="Room"
                {...register('room', {
                  required: 'This is required',
                  minLength: { value: 3, message: 'Minimum length should be 3' }
                })}
                variant="flushed"
                isInvalid={!!errors?.room}
                disabled={!!initialFormValues?.room}
                autoComplete="off"
              />
              <FormErrorMessage>
                {errors?.room && errors.room.message}
              </FormErrorMessage>
            </Box>

            <Box>
              <FormLabel htmlFor="inputName" margin={0}>
                Input Device Name
              </FormLabel>
              <Input
                id="inputName"
                placeholder="Input Device Name"
                {...register('inputName', {
                  required: 'This is required',
                  minLength: { value: 3, message: 'Minimum length should be 3' }
                })}
                variant="flushed"
                isInvalid={!!errors?.inputName}
                disabled={!!initialFormValues?.inputName}
                autoComplete="off"
              />
              <FormErrorMessage>
                {errors?.inputName && errors.inputName.message}
              </FormErrorMessage>
            </Box>

            {!initialFormValues?.battery && <OutputForm />}

            <Box>
              <Checkbox
                id="alarm"
                {...register('alarm', {
                  required: false
                })}
                disabled={!!initialFormValues?.alarm}
                fontWeight="medium"
              >
                Alarm
              </Checkbox>
            </Box>
          </Stack>
        </FormControl>

        <Button
          mt={8}
          colorScheme="teal"
          isLoading={isSubmitting}
          type="submit"
          size="lg"
          isFullWidth
        >
          Submit
        </Button>
      </form>
    </FormProvider>
  )
}
