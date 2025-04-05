import './styles.css'

import { ApiHandler } from './moduls/apiHandler'
import { UI } from './moduls/ui'
import { EventHandler } from './moduls/eventHandler'

export const apiHandler = new ApiHandler()
export const eventHandler = new EventHandler()
export const ui = new UI()
