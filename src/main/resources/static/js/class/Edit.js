import {Controller} from "https://unpkg.com/@hotwired/stimulus/dist/stimulus.js"

export default class Edit extends Controller {
    submit() {
        const formData = new FormData(this.element)
        console.log(formData.get('classId'))
    }


}