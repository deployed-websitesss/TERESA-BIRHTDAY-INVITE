import { useRef } from "react"

export default function Rsvp({ rsvp }) {
  const rejectDialogRef = useRef(null)

  const openRejectDialog = (event) => {
    const dialog = rejectDialogRef.current

    // Fall back to the normal WhatsApp link if <dialog> is unsupported.
    if (!dialog || typeof dialog.showModal !== "function") return

    event.preventDefault()

    if (!dialog.open) {
      dialog.showModal()
    }
  }

  const closeRejectDialog = () => {
    rejectDialogRef.current?.close()
  }

  return (
    <>
      <section className="rsvp" id="rsvp" aria-labelledby="rsvp-title">
        <div className="shell grid12">
          <p className="rsvp__mark" aria-hidden="true">
            R.S.V.P.
          </p>

          <div className="rsvp__panel">
            <p className="eyebrow" data-reveal>
              {rsvp.index} — {rsvp.eyebrow}
            </p>

            <h2
              className="rsvp__title"
              id="rsvp-title"
              data-reveal
              data-reveal-delay="0.08"
            >
              {rsvp.titleTop}
              <em>{rsvp.titleEm}</em>
            </h2>

            <p className="rsvp__body" data-reveal data-reveal-delay="0.14">
              {rsvp.body}
            </p>

            <div className="rsvp__actions" data-reveal data-reveal-delay="0.2">
              <a className="btn btn--primary" href={rsvp.primary.href}>
                {rsvp.primary.label}
              </a>

              <a
                className="btn btn--ghost"
                href={rsvp.secondary.href}
                onClick={openRejectDialog}
              >
                {rsvp.secondary.label}
              </a>
            </div>

            <p className="rsvp__note" data-reveal data-reveal-delay="0.26">
              {rsvp.note}
            </p>

            <dl className="rsvp__contact" data-reveal data-reveal-delay="0.3">
              {rsvp.contacts.map((contact) => (
                <div key={contact.term}>
                  <dt>{contact.term}</dt>
                  <dd>
                    <a href={contact.href}>{contact.value}</a>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <dialog
        ref={rejectDialogRef}
        className="reject-dialog"
        aria-labelledby="reject-dialog-title"
        aria-describedby="reject-dialog-description"
        onClick={(event) => {
          if (event.target === event.currentTarget) {
            closeRejectDialog()
          }
        }}
      >
        <div className="reject-dialog__panel">
          <p className="reject-dialog__eyebrow">A final question</p>

          <h3 className="reject-dialog__title" id="reject-dialog-title">
            Sure ka na?
          </h3>

          <p
            className="reject-dialog__copy"
            id="reject-dialog-description"
          >
            <strong>Pag ni-reject mo, panget ka. 😌</strong>
            <span>Joke lang—but are you really sure you cannot make it?</span>
          </p>

          <div className="reject-dialog__actions">
            <button
              type="button"
              className="btn btn--primary"
              onClick={closeRejectDialog}
            >
              Hindi, a-attend ako
            </button>

            <a
              className="btn btn--ghost"
              href={rsvp.secondary.href}
              onClick={closeRejectDialog}
            >
              Oo, send mo na yan
            </a>
          </div>
        </div>
      </dialog>
    </>
  )
}