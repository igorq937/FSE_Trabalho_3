import { SunIcon } from '@chakra-ui/icons'
import {
  Badge,
  Box,
  Flex,
  Grid,
  Stat,
  StatHelpText,
  StatLabel,
  StatNumber,
  Text,
  Tooltip
} from '@chakra-ui/react'

import { Alarm } from '@components/Alarm'
import { MacBadge } from '@components/MacBadge'

import { DeleteIcon } from './DeleteIcon'
import { DHT } from './DHT'
import { OutputSwitch } from './OutputSwitch'

interface DeviceProps {
  device: Device
}

export const Device = ({ device }: DeviceProps) => {
  return (
    <Grid templateRows="auto 1fr">
      <Flex justify="space-between" alignItems="flex-end">
        <Text fontSize="md" textTransform="capitalize" color="white">
          // {device.room}
        </Text>
        <Box>
          {device.alarm ? <Alarm device={device} /> : null}

          {device.battery ? (
            <Tooltip
              hasArrow
              label={`Battery mode On`}
              placement="top"
              closeOnClick={false}
              bg="whiteAlpha.800"
              color="black"
              openDelay={250}
            >
              <Badge variant="solid" colorScheme="purple" color="white" ml={1}>
                Battery
              </Badge>
            </Tooltip>
          ) : null}
        </Box>
      </Flex>
      <Flex
        flexDirection="column"
        height="100%"
        gap={2}
        border="2px solid"
        borderColor="whiteAlpha.700"
        padding={6}
        isTruncated
      >
        <Stat>
          <StatLabel display="flex" justifyContent="space-between" gap={2}>
            <MacBadge mac={device.mac} />

            <DeleteIcon device={device} />
          </StatLabel>
          <StatNumber my={1.5}>
            <Flex
              alignItems="center"
              gap={2}
              color="white"
              textTransform="capitalize"
            >
              {device.inputName}
              {
                {
                  true: <SunIcon color="cyan.500" />,
                  false: <SunIcon color="whiteAlpha.600" />
                }[Boolean(device.inputState)?.toString?.()]
              }
              <Text
                as="span"
                fontSize="xs"
                fontWeight="light"
                color={device.inputState ? 'cyan' : 'whiteAlpha.600'}
              >
                {device.inputState ? 'ON' : 'OFF'}
              </Text>
            </Flex>
          </StatNumber>
          <StatHelpText display="flex" gap={4}>
            <DHT device={device} />
          </StatHelpText>
        </Stat>

        <OutputSwitch device={device} />
      </Flex>
    </Grid>
  )
}
