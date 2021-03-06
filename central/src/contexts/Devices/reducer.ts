import { toast } from 'react-toastify'
import isEqual from 'lodash/isEqual'

export enum ACTIONS {
  ADD_DEVICE = 'ADD_DEVICE',
  REMOVE_DEVICE = 'REMOVE_DEVICE',
  UPDATE_DEVICE = 'UPDATE_DEVICE'
}

type State = Device[]

type Action = {
  type: ACTIONS
  payload: any
}

export const stateReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'ADD_DEVICE': {
      if (state.find((device) => device.mac === action.payload.mac))
        return state

      toast.success('Device added')

      return [...state, action.payload]
    }

    case 'REMOVE_DEVICE': {
      toast.success('Device removed')

      return state.filter((device) => device.mac !== action.payload.mac)
    }

    case 'UPDATE_DEVICE': {
      const { mac, ...rest } = action.payload

      const newDeviceState =
        rest?.state || rest?.inputState || rest?.outputState || 0

      const index = state.findIndex((d) => d.mac === mac)
      if (index === -1) return state

      const newState = [...state]
      newState[index] = { ...newState[index], ...rest }
      if (isEqual(newState[index], state[index])) return state

      if (rest?.inputState !== undefined)
        toast.success(
          `${newState[index].inputName} turned ${newDeviceState ? 'ON' : 'OFF'}`
        )

      if (rest?.outputState !== undefined)
        toast.success(
          `${newState[index].outputName} turned ${
            newDeviceState ? 'ON' : 'OFF'
          }`
        )

      return newState
    }

    default:
      console.log('Invalid action')

      return state
      break
  }
}
