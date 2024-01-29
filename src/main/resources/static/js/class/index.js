import {Application} from "https://unpkg.com/@hotwired/stimulus/dist/stimulus.js"
import Details from "./Details.js"

window.Stimulus = Application.start()

Stimulus.register("class-details", Details)
