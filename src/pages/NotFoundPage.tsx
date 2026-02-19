import { Link } from "react-router-dom";
import { ArrowLeft, Home } from "lucide-react";
import { memo } from "react";
import { SEO } from "@/components/SEO";

const NotFoundPage = () => (
    <>
        <SEO title="404 - Page Not Found" description="The page you're looking for doesn't exist." />
        <div className="min-h-screen bg-background flex items-center justify-center px-6">
            <div className="text-center max-w-md">
                {/* Large 404 */}
                <h1 className="text-[8rem] font-extrabold leading-none text-primary/20 select-none">
                    404
                </h1>

                {/* Message */}
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3 -mt-4">
                    Page not found
                </h2>
                <p className="text-muted-foreground mb-8 leading-relaxed">
                    The page you're looking for doesn't exist or has been moved.
                </p>

                {/* Actions */}
                <div className="flex flex-wrap gap-4 justify-center">
                    <Link
                        to="/"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-full font-medium hover:opacity-90 transition-all hover:scale-105 active:scale-95"
                    >
                        <Home className="w-4 h-4" />
                        Back to Home
                    </Link>
                    <button
                        onClick={() => window.history.back()}
                        className="inline-flex items-center gap-2 px-6 py-3 bg-card border border-border text-foreground rounded-full font-medium hover:bg-muted transition-all active:scale-95"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Go Back
                    </button>
                </div>
            </div>
        </div>
    </>
);

export default memo(NotFoundPage);
