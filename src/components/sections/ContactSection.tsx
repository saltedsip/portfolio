import { useState } from "react";
import { ArrowRight, Mail, MapPin, Clock, Linkedin, CheckCircle2, AlertCircle } from "lucide-react";
import { contactContent, contactMethods, personalInfo } from "@/data/portfolio";

// Icon mapping for direct contact channels
const iconMap: Record<string, React.ElementType> = {
  mail: Mail,
  linkedin: Linkedin,
};

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    const stateKey = name === "fi-sender-fullName"
      ? "name"
      : name === "fi-sender-email"
      ? "email"
      : name === "fi-text-message"
      ? "message"
      : name;

    setFormData((prev) => ({ ...prev, [stateKey]: value }));
    if (errors[stateKey]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[stateKey];
        return next;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validation
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setStatus("submitting");

    try {
      const forminitId = import.meta.env.VITE_FORMINIT_ID || "qdnpd8mk1xv";
      const response = await fetch(`https://forminit.com/f/${forminitId}`, {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: new FormData(e.currentTarget),
      });

      if (response.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="py-12">
      {/* Section Header */}
      <div className="mb-16">
        <p className="text-sm text-primary font-semibold uppercase tracking-wider mb-2">
          {contactContent.title || "Contact"}
        </p>
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Let's work together
        </h2>
        <p className="text-muted-foreground max-w-2xl text-lg leading-relaxed">
          {contactContent.subtitle}
        </p>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Side: Copy and Meta Details */}
        <div className="lg:col-span-5 space-y-10">
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-foreground">
              {contactContent.ctaTitle || "Ready to start a project?"}
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              I'm always excited to work on new projects and collaborate with passionate founders.
              Fill out the form or write to me directly at {personalInfo.email}.
            </p>
          </div>

          {/* Elegant Meta Details List */}
          <div className="space-y-6">
            {/* Availability */}
            <div className="flex items-start gap-4">
              <div className="w-11 h-11 rounded-xl bg-card border border-border flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="relative flex h-3.5 w-3.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-green-500"></span>
                </span>
              </div>
              <div>
                <p className="font-semibold text-foreground">Currently Available</p>
                <p className="text-sm text-muted-foreground">{contactContent.availability}</p>
              </div>
            </div>

            {/* Response Time */}
            <div className="flex items-start gap-4">
              <div className="w-11 h-11 rounded-xl bg-card border border-border flex items-center justify-center flex-shrink-0 mt-0.5">
                <Clock className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="font-semibold text-foreground">Quick Response</p>
                <p className="text-sm text-muted-foreground">Usually reply within 24 hours</p>
              </div>
            </div>

            {/* Location */}
            <div className="flex items-start gap-4">
              <div className="w-11 h-11 rounded-xl bg-card border border-border flex items-center justify-center flex-shrink-0 mt-0.5">
                <MapPin className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="font-semibold text-foreground">{personalInfo.location}</p>
                <p className="text-sm text-muted-foreground">Working remotely with global timezone compatibility</p>
              </div>
            </div>
          </div>

          {/* Social Channels (Only Email & LinkedIn) */}
          {contactMethods.length > 0 && (
            <div className="pt-6 border-t border-border/50">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4 block">
                Direct Channels
              </h4>
              <div className="space-y-4">
                {contactMethods.map((method) => {
                  const Icon = iconMap[method.icon] || Mail;
                  const href = method.href === "gmail"
                    ? `mailto:${method.value}?subject=Project%20Inquiry`
                    : method.href;

                  return (
                    <a
                      key={method.id}
                      href={href}
                      target={method.href.startsWith("http") ? "_blank" : undefined}
                      rel={method.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="flex items-center gap-4 group text-muted-foreground hover:text-primary transition-colors"
                    >
                      <div className="w-10 h-10 rounded-xl bg-card border border-border flex items-center justify-center group-hover:border-primary/50 transition-colors">
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-[10px] uppercase tracking-widest text-muted-foreground">{method.label}</p>
                        <p className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                          {method.value}
                        </p>
                      </div>
                    </a>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Right Side: Form Card */}
        <div className="lg:col-span-7 bg-card border border-border rounded-3xl p-8 md:p-10">
          {status === "success" ? (
            <div className="flex flex-col items-center justify-center text-center py-16 h-full">
              <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mb-6">
                <CheckCircle2 className="w-10 h-10 text-green-500" />
              </div>
              <h3 className="text-2xl font-bold mb-2">Message Sent!</h3>
              <p className="text-muted-foreground max-w-sm mb-6">
                Thank you for reaching out! I've received your inquiry and will get back to you within 24 hours.
              </p>
              <button
                type="button"
                onClick={() => setStatus("idle")}
                className="px-6 py-2.5 bg-muted hover:bg-muted/80 text-foreground rounded-full text-sm font-medium transition-colors"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <h3 className="text-xl font-bold mb-1">Send a message</h3>
                <p className="text-xs text-muted-foreground">
                  I typically respond to inquiries same-day.
                </p>
              </div>

              {/* Name */}
              <div className="space-y-2">
                <label htmlFor="name" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="fi-sender-fullName"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="John Doe"
                  className={`w-full px-4 py-3 bg-muted/30 border ${
                    errors.name ? "border-primary" : "border-border"
                  } rounded-xl text-base text-foreground placeholder:text-muted-foreground/30 focus:outline-none focus:border-primary/50 transition-colors`}
                />
                {errors.name && (
                  <p className="text-xs text-primary flex items-center gap-1 mt-1">
                    <AlertCircle className="w-3.5 h-3.5" /> {errors.name}
                  </p>
                )}
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label htmlFor="email" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="fi-sender-email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="john@example.com"
                  className={`w-full px-4 py-3 bg-muted/30 border ${
                    errors.email ? "border-primary" : "border-border"
                  } rounded-xl text-base text-foreground placeholder:text-muted-foreground/30 focus:outline-none focus:border-primary/50 transition-colors`}
                />
                {errors.email && (
                  <p className="text-xs text-primary flex items-center gap-1 mt-1">
                    <AlertCircle className="w-3.5 h-3.5" /> {errors.email}
                  </p>
                )}
              </div>

              {/* Message */}
              <div className="space-y-2">
                <label htmlFor="message" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Project Details
                </label>
                <textarea
                  id="message"
                  name="fi-text-message"
                  rows={5}
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Describe your project goals, timeline, and requirements..."
                  className={`w-full px-4 py-3 bg-muted/30 border ${
                    errors.message ? "border-primary" : "border-border"
                  } rounded-xl text-base text-foreground placeholder:text-muted-foreground/30 focus:outline-none focus:border-primary/50 transition-colors resize-none`}
                />
                {errors.message && (
                  <p className="text-xs text-primary flex items-center gap-1 mt-1">
                    <AlertCircle className="w-3.5 h-3.5" /> {errors.message}
                  </p>
                )}
              </div>

              {/* Error submission message */}
              {status === "error" && (
                <div className="p-3 bg-primary/10 border border-primary/20 rounded-xl text-xs text-primary flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>Something went wrong. Please try again or email me directly at {personalInfo.email}.</span>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={status === "submitting"}
                className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-full font-semibold hover:opacity-90 transition-all hover:scale-[1.01] active:scale-[0.99] text-base disabled:opacity-50 disabled:pointer-events-none"
              >
                {status === "submitting" ? (
                  <>
                    <div className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    Send Inquiry
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
