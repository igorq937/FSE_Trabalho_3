import { Badge, Tooltip } from '@chakra-ui/react'

interface Props {
  mac: string
}

export const MacBadge = ({ mac }: Props) => {
  return (
    <Tooltip
      hasArrow
      label={`MAC Address`}
      placement="right"
      closeOnClick={false}
      bg="whiteAlpha.800"
      color="black"
      openDelay={250}
    >
      <Badge variant="outline" colorScheme="cyan" isTruncated>
        {mac}
      </Badge>
    </Tooltip>
  )
}
