import { Button } from "@/components/ui/button";

const fieldClass =
  "mt-2 w-full rounded-lg border border-field-line bg-field px-3 py-2.5 text-base text-ink outline-none placeholder:text-ink-soft/70 focus-visible:border-[#f21b51] focus-visible:ring-3 focus-visible:ring-[#f21b51]/40";

export function ContactForm() {
  return (
    <form action="contact.php" method="post" className="mt-8 max-w-xl">
      <p className="text-lg leading-relaxed text-ink-soft">
        Send a note. I’ll reply by email.
      </p>
      <div className="sr-only" aria-hidden="true">
        <label>
          Company
          <input name="company" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <div className="mt-5">
        <label htmlFor="contact-name" className="text-sm text-ink">
          Name
        </label>
        <input
          id="contact-name"
          name="name"
          type="text"
          required
          maxLength={120}
          autoComplete="name"
          className={fieldClass}
        />
      </div>
      <div className="mt-4">
        <label htmlFor="contact-email" className="text-sm text-ink">
          Email
        </label>
        <input
          id="contact-email"
          name="email"
          type="email"
          required
          maxLength={200}
          autoComplete="email"
          className={fieldClass}
        />
      </div>
      <div className="mt-4">
        <label htmlFor="contact-message" className="text-sm text-ink">
          Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          maxLength={5000}
          rows={6}
          className={fieldClass}
        />
      </div>
      <Button type="submit" className="mt-5 h-11 px-5 text-[0.95rem]">
        Send
      </Button>
    </form>
  );
}
