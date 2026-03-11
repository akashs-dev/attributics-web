import { useState } from "react";
import { ArrowRight, ChevronDown, Upload, CheckCircle, Signature } from "lucide-react";
import Block from "../../components/layout/Block";
import { formLinks } from "../../constants/contact";
import { typography } from "../../constants/global";

const FORMSPREE_ENDPOINT = formLinks.career;

const headlineSize = "clamp(2rem, 1.4rem + 2.6vw, 3.4rem)";
const successTitleSize = "clamp(1.4rem, 1.1rem + 1.2vw, 2rem)";
const bodyTextSize = "clamp(0.95rem, 0.85rem + 0.4vw, 1.05rem)";

const SendCV = () => {
    const [form, setForm] = useState({
        role: "",
        location: "",
        workType: "",
        cv: null,
    });

    const [errors, setErrors] = useState({});
    const [cvFileName, setCvFileName] = useState("");
    const [status, setStatus] = useState("idle"); // idle | submitting | success | error

    const validate = () => {
        const newErrors = {};
        if (!form.role) newErrors.role = "Please select a role.";
        if (!form.location) newErrors.location = "Please select a location.";
        if (!form.workType) newErrors.workType = "Please select a work type.";
        if (!form.cv) {
            newErrors.cv = "Please upload your CV.";
        } else {
            const allowedTypes = [
                "application/pdf",
                "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            ];
            if (!allowedTypes.includes(form.cv.type)) {
                newErrors.cv = "Only PDF or DOCX files are allowed.";
            } else if (form.cv.size > 10 * 1024 * 1024) {
                newErrors.cv = "File must be under 10MB.";
            }
        }
        return newErrors;
    };

    const handleSelect = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({ ...prev, [name]: undefined }));
    };

    const handleFile = (e) => {
        const file = e.target.files[0];
        if (file) {
            setForm((prev) => ({ ...prev, cv: file }));
            setCvFileName(file.name);
            setErrors((prev) => ({ ...prev, cv: undefined }));
        }
    };

    const handleSubmit = async () => {
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setStatus("submitting");

        const data = new FormData();
        data.append("role", form.role);
        data.append("location", form.location);
        data.append("workType", form.workType);
        data.append("cv", form.cv);

        try {
            const res = await fetch(FORMSPREE_ENDPOINT, {
                method: "POST",
                body: data,
                headers: { Accept: "application/json" },
            });

            if (res.ok) {
                setStatus("success");
            } else {
                setStatus("error");
            }
        } catch {
            setStatus("error");
        }
    };

    if (status === "success") {
        return (
            <Block xpad="small" topMargin="large">
                <section className="container mx-auto px-6 max-w-4xl mb-32">
                    <div className="bg-white p-8 sm:p-10 md:p-16 rounded-[1.5rem] sm:rounded-[2rem] border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col items-center text-center gap-4 sm:gap-6">
                        <div className="w-14 h-14 sm:w-16 sm:h-16 bg-green-50 rounded-full flex items-center justify-center">
                            <CheckCircle className="text-green-500" size={32} />
                        </div>
                        <h3 className="font-display font-bold text-slate-900" style={{ fontSize: successTitleSize }}>
                            Application Sent!
                        </h3>
                        <p className="text-slate-500 max-w-sm" style={{ fontSize: bodyTextSize }}>
                            Thanks for applying. We'll review your CV and get back to you soon.
                        </p>
                        <button
                            onClick={() => {
                                setForm({ role: "", location: "", workType: "", cv: null });
                                setCvFileName("");
                                setErrors({});
                                setStatus("idle");
                            }}
                            className="mt-2 text-sm font-semibold text-slate-400 hover:text-slate-700 transition-colors underline underline-offset-4"
                        >
                            Submit another application
                        </button>
                    </div>
                </section>
            </Block>
        );
    }

    return (
        <>
            <Block xpad="small" topMargin="medium">
                {/* Jobs Section */}
                <section className="container mx-auto px-1 max-w-4xl mb-24 sm:mb-32">
                    <div className="text-center mb-6">
                        <span className="section-eyebrow mb-4 block">What are you waiting for?</span>
                        <h2
                            className="section-title"
                            style={typography.title.XXL}
                        >
                            Interested in Joining <span className="highlight">Us?</span>
                        </h2>
                    </div>

                    <div className="bg-white p-4 sm:p-4 md:p-10 rounded-[1.5rem] sm:rounded-[2rem] border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                        <div className="flex flex-col gap-5 sm:gap-6">

                            {/* Role Field */}
                            <div>
                                <label className="block text-xs sm:text-sm font-bold text-slate-700 mb-2">Select Role</label>
                                <div className="relative">
                                    <select
                                        name="role"
                                        value={form.role}
                                        onChange={handleSelect}
                                        className={`w-full bg-slate-50 border rounded-xl px-4 sm:px-5 py-3 sm:py-4 text-sm sm:text-base text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-[#FF5A36]/20 focus:border-[#FF5A36] transition-all appearance-none cursor-pointer ${errors.role ? "border-red-400 bg-red-50" : "border-slate-200"}`}
                                    >
                                        <option value="" disabled>Choose a position...</option>
                                        <optgroup label="Data & Analytics">
                                            <option value="Junior Business Analyst">Junior Business Analyst</option>
                                            <option value="Marketing Data Analyst">Marketing Data Analyst</option>
                                            <option value="Mid Business Analyst">Mid Business Analyst</option>
                                            <option value="Senior BA">Senior BA</option>
                                            <option value="Head of Insights & Strategy">Head of Insights & Strategy</option>
                                        </optgroup>
                                        <optgroup label="Engineering & Development">
                                            <option value="Intern SDE">Intern SDE</option>
                                            <option value="Emerging Tech Intern">Emerging Tech Intern</option>
                                            <option value="Junior Associate Software Engineer">Junior Associate Software Engineer</option>
                                            <option value="Full-Stack Developer (MarTech)">Full-Stack Developer (MarTech)</option>
                                            <option value="Mid Software Development Engineer">Mid Software Development Engineer</option>
                                            <option value="Systems Integration Engineer">Systems Integration Engineer</option>
                                            <option value="Senior SDE">Senior SDE</option>
                                            <option value="Senior Platform Engineer">Senior Platform Engineer</option>
                                        </optgroup>
                                        <optgroup label="Leadership & Executive">
                                            <option value="Director of Engineering">Director of Engineering</option>
                                            <option value="VP of Delivery">VP of Delivery</option>
                                            <option value="Chief Technology Officer (CTO)">Chief Technology Officer (CTO)</option>
                                            <option value="VP of Growth & Innovation">VP of Growth & Innovation</option>
                                        </optgroup>
                                        <optgroup label="Specialized MarTech Roles">
                                            <option value="Implementation Specialist">Implementation Specialist</option>
                                            <option value="Marketing Automation Developer">Marketing Automation Developer</option>
                                            <option value="Conversion Rate Optimization (CRO) Specialist">Conversion Rate Optimization (CRO) Specialist</option>
                                            <option value="Technical Product Manager">Technical Product Manager</option>
                                        </optgroup>
                                    </select>
                                    <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={20} />
                                </div>
                                {errors.role && <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.role}</p>}
                            </div>

                            <div className="grid md:grid-cols-2 gap-5 sm:gap-6">
                                {/* Location Preference */}
                                <div>
                                    <label className="block text-xs sm:text-sm font-bold text-slate-700 mb-2">Location Preference</label>
                                    <div className="relative">
                                        <select
                                            name="location"
                                            value={form.location}
                                            onChange={handleSelect}
                                            className={`w-full bg-slate-50 border rounded-xl px-4 sm:px-5 py-3 sm:py-4 text-sm sm:text-base text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-[#FF5A36]/20 focus:border-[#FF5A36] transition-all appearance-none cursor-pointer ${errors.location ? "border-red-400 bg-red-50" : "border-slate-200"}`}
                                        >
                                            <option value="" disabled>Select location...</option>
                                            <option value="pune">Pune, India</option>
                                        </select>
                                        <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={20} />
                                    </div>
                                    {errors.location && <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.location}</p>}
                                </div>

                                {/* Work Type */}
                                <div>
                                    <label className="block text-xs sm:text-sm font-bold text-slate-700 mb-2">Work Type</label>
                                    <div className="relative">
                                        <select
                                            name="workType"
                                            value={form.workType}
                                            onChange={handleSelect}
                                            className={`w-full bg-slate-50 border rounded-xl px-4 sm:px-5 py-3 sm:py-4 text-sm sm:text-base text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-[#FF5A36]/20 focus:border-[#FF5A36] transition-all appearance-none cursor-pointer ${errors.workType ? "border-red-400 bg-red-50" : "border-slate-200"}`}
                                        >
                                            <option value="" disabled>Select type...</option>
                                            <option value="onsite">Onsite</option>
                                            <option value="offsite">Offsite</option>
                                            <option value="hybrid">Hybrid</option>
                                        </select>
                                        <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={20} />
                                    </div>
                                    {errors.workType && <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.workType}</p>}
                                </div>
                            </div>

                            {/* CV Upload */}
                            <div>
                                <label className="block text-xs sm:text-sm font-bold text-slate-700 mb-2">Upload CV</label>
                                <div className="relative group">
                                    <input
                                        type="file"
                                        accept=".pdf,.docx"
                                        onChange={handleFile}
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                    />
                                    <div className={`w-full bg-slate-50 border-2 border-dashed rounded-xl px-4 sm:px-5 py-6 sm:py-8 flex flex-col items-center justify-center gap-3 transition-colors
                                        ${errors.cv ? "border-red-400 bg-red-50" : "border-slate-200 group-hover:bg-[#FF5A36]/5 group-hover:border-[#FF5A36]/30"}
                                        ${cvFileName ? "border-green-300 bg-green-50" : ""}
                                    `}>
                                        <div className={`w-11 h-11 sm:w-12 sm:h-12 bg-white rounded-full shadow-sm flex items-center justify-center transition-colors
                                            ${cvFileName ? "text-green-500" : "text-slate-400 group-hover:text-[#FF5A36]"}
                                        `}>
                                            {cvFileName ? <CheckCircle size={24} /> : <Upload size={24} />}
                                        </div>
                                        <div className="text-center">
                                            {cvFileName ? (
                                                <p className="font-bold text-green-600 text-sm sm:text-base">{cvFileName}</p>
                                            ) : (
                                                <>
                                                    <span className="font-bold text-slate-700 group-hover:text-[#FF5A36] transition-colors text-sm sm:text-base">Click to upload</span> or drag and drop
                                                    <p className="text-xs text-slate-400 mt-1">PDF, DOCX up to 10MB</p>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                {errors.cv && <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.cv}</p>}
                            </div>

                            {/* Submit error */}
                            {status === "error" && (
                                <p className="text-center text-red-500 text-sm font-medium">
                                    Something went wrong. Please try again or email us directly.
                                </p>
                            )}

                            <div className="pt-4 flex justify-center">
                                <button
                                    onClick={handleSubmit}
                                    disabled={status === "submitting"}
                                    className="group flex flex-row relative px-6 sm:px-10 py-3 sm:py-4 text-sm sm:text-base bg-slate-900 text-white rounded-full font-semibold overflow-hidden transition-all hover:pr-12 sm:hover:pr-14 disabled:opacity-60 disabled:cursor-not-allowed"
                                >
                                    <p className="section-description relative z-10 flex items-center gap-2" style={{color: 'white'}}>
                                        <Signature size={18} className="text-brand" />
                                        {status === "submitting" ? "Sending..." : "Send CV"}
                                    </p>
                                    {status !== "submitting" && (
                                        <ArrowRight className="absolute right-5 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all" size={20} />
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
            </Block>
        </>
    );
};

export default SendCV;
