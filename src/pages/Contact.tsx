import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill in all required fields.");
      return;
    }
    toast.success("Message sent successfully! We'll get back to you soon.");
    setForm({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="container py-16">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
        <h1 className="text-4xl font-heading font-bold mb-4">Contact <span className="gradient-text">Us</span></h1>
        <p className="text-muted-foreground max-w-md mx-auto">Have questions? We'd love to hear from you.</p>
      </motion.div>
      <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
        <div className="flex flex-col gap-6">
          {[
            { icon: Mail, label: "Email", value: "support@lms.com" },
            { icon: Phone, label: "Phone", value: "+1 (555) 123-4567" },
            { icon: MapPin, label: "Address", value: "123 Learning St, San Francisco, CA" },
          ].map((item) => (
            <div key={item.label} className="glass rounded-xl p-5 flex items-start gap-3">
              <item.icon className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <div className="font-medium text-sm">{item.label}</div>
                <div className="text-sm text-muted-foreground">{item.value}</div>
              </div>
            </div>
          ))}
        </div>
        <form onSubmit={handleSubmit} className="md:col-span-2 glass rounded-xl p-8 flex flex-col gap-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Your name *" className="px-4 py-2.5 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/40" />
            <input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} type="email" placeholder="Your email *" className="px-4 py-2.5 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/40" />
          </div>
          <input value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} placeholder="Subject" className="px-4 py-2.5 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/40" />
          <textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} rows={5} placeholder="Your message *" className="px-4 py-2.5 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 resize-none" />
          <Button type="submit" className="self-end"><Send className="h-4 w-4 mr-2" /> Send Message</Button>
        </form>
      </div>
    </div>
  );
}
