import { InputGroupRoot } from './InputGroupRoot'
import { InputGroupLabel } from './InputGroupLabel'
import { InputGroupInputText } from './InputGroupInputText'
import { InputGroupInputPassword } from './InputGroupInputPassword'
import { InputGroupMessage } from './InputGroupMessage'

export const InputGroup = Object.assign(InputGroupRoot, {
  Label: InputGroupLabel,
  InputText: InputGroupInputText,
  InputPassword: InputGroupInputPassword,
  Message: InputGroupMessage,
})
