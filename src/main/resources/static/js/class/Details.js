import {Controller} from "https://unpkg.com/@hotwired/stimulus/dist/stimulus.js"

export default class Details extends Controller {
    static targets = ["generalTab", "generalIcon1", "generalIcon2", "attendeeTab", "attendeeIcon1", "attendeeIcon2", "timeframeTab", "timeframeIcon1", "timeframeIcon2", "classManagerPopup"]
    static values = {
        openGeneral: Boolean, openTimeframe: Boolean, openAttendee: Boolean
    }

    toggleClassManagerPopup() {
        this.classManagerPopupTarget.hidden = !this.classManagerPopupTarget.hidden
    }

    handleTabClick({params: {tab}}) {
        switch (tab) {
            case "general":
                this.openGeneralValue = !this.openGeneralValue
                break
            case "attendee":
                this.openAttendeeValue = !this.openAttendeeValue
                break
            case "timeframe":
                this.openTimeframeValue = !this.openTimeframeValue
                break
        }
    }

    openGeneralValueChanged() {
        if (!this.hasGeneralTabTarget) return

        this.generalTabTarget.hidden = !this.openGeneralValue
        this.generalIcon1Target.hidden = !this.openGeneralValue
        this.generalIcon2Target.hidden = this.openGeneralValue
    }

    openAttendeeValueChanged() {
        if (!this.hasAttendeeTabTarget) return

        this.attendeeTabTarget.hidden = !this.openAttendeeValue
        this.attendeeIcon1Target.hidden = !this.openAttendeeValue
        this.attendeeIcon2Target.hidden = this.openAttendeeValue
    }

    openTimeframeValueChanged() {
        if (!this.hasTimeframeTabTarget) return

        this.timeframeTabTarget.hidden = !this.openTimeframeValue
        this.timeframeIcon1Target.hidden = !this.openTimeframeValue
        this.timeframeIcon2Target.hidden = this.openTimeframeValue
    }

    addNewAdmin({params}) {
        const adminId = document.getElementById("selectNewAdmin").value
        if (!adminId) {
            swal("Error", "Please choose an admin", "error")
            return
        }
        console.log(params)
        fetch(`/class/admin`, {
            method: "POST",
            body: JSON.stringify({
                userId: Number(adminId),
                classId: params.classId,
                userType: "ADMIN"
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => response.json())
            .then(data => {
                // console.log(data)
                swal("Success", "Admin added", "success")
                document.getElementById("selectNewAdmin").value = ""
                window.Turbo.renderStreamMessage(`
                <turbo-stream action="append" target="current_admins">
                    <template>
                        <div class="frame-113-rrL" id="admin-${data.idCU}">
                            <div class="frame-107-cKi opacity-0">
                                <img class="grade-mCc" src="/assets/grade-blue.png"/>
                                <p class="admin-VuJ">Admin</p>
                            </div>
                            <div class="frame-5011-Ert">
                                <p class="ly-lien-lien-dung-zLG">${data.user.name}</p>
                                <a href="/class/admins/${data.idCU}"
                                   title="Remove admin"
                                   data-turbo-method="delete"
                                   class="delete-btn">
                                    <img class="delete-logo" src="/assets/frame-93.png"/>
                                </a>
                            </div>
                       </div>
                    </template>
                </turbo-stream>
                `)
            }).catch(error => {
                swal("Error", "Something went wrong", "error")
                console.log(error)
            }
        )
    }

    addNewTrainer({params}) {
        const trainerId = document.getElementById("selectNewTrainer").value
        if (!trainerId) {
            swal("Error", "Please choose a trainer", "error")
            return
        }
        console.log(params)
        fetch(`/class/admin`, {
            method: "POST",
            body: JSON.stringify({
                userId: Number(trainerId),
                classId: params.classId,
                userType: "TRAINER"
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })
          .then(response => response.json())
          .then(data => {
              // console.log(data)
              swal("Success", "Trainer added", "success")
              document.getElementById("selectNewTrainer").value = ""
              window.Turbo.renderStreamMessage(`
                <turbo-stream action="append" target="current_trainers">
                    <template>
                        <div class="frame-113-rrL" id="trainer-${data.idCU}">
                            <div class="frame-107-cKi opacity-0">
                                <img class="concept-lecture-sn8" src="/assets/concept-lecture-blue.png"/>
                                <p class="trainer-17e">Trainer</p>
                            </div>
                            <div class="frame-5011-Ert">
                                <p class="ly-lien-lien-dung-zLG">${data.user.name}</p>
                                <a href="/class/trainers/${data.idCU}"
                                   title="Remove trainer"
                                   data-turbo-method="delete"
                                   class="delete-btn">
                                    <img class="delete-logo" src="/assets/frame-93.png"/>
                                </a>
                            </div>
                       </div>
                    </template>
                </turbo-stream>
                `)
          }).catch(error => {
              swal("Error", "Something went wrong", "error")
              console.log(error)
          }
        )
    }
}