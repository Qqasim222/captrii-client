import React from "react";
import { Link } from "react-router-dom";
import IntroSection from "../components/ui/IntroSection/intro-section";
import LoginSection from "../components/ui/LoginSection/login-section";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { IconButton } from "@mui/material";

declare global {
    interface Window {
        google: any;
    }
}
const Login: React.FC = () => {
    return (
        <>
            <IconButton sx={{ width: "20px", height: "20px", padding: "1.5rem" }}> <Link to="/"><KeyboardBackspaceIcon /></Link></IconButton>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4" >
                <div className="md:col-span-6">
                    <IntroSection />
                </div>

                <div className="md:col-span-6">
                    <LoginSection />
                </div>
            </div>
        </>
    );
};

export default Login;
