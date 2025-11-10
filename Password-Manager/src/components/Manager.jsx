
import React, { useRef, useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';

import { v4 as uuidv4 } from 'uuid';
import 'react-toastify/dist/ReactToastify.css';

const Manager = () => {
    const ref = useRef();
    const passwordRef = useRef();
    const [form, setform] = useState({ site: "", username: "", password: "" });
    const [passwordArray, setPasswordArray] = useState([]);

const getPasswords =()=>{
    let req =  fetch("https://localhost:3000/")
    let passwords = req.json()
    
        setPasswordArray(JSON.parse(passwords))
    console.log(passwords)
}

    // Load saved passwords on mount
    useEffect(() => {

        let passwords = localStorage.getItem("passwords");
        if (passwords) {
            setPasswordArray(JSON.parse(passwords));
        }
    }, []);

    const copyText = (text) => {
        // alert("copied to clipboard" + text)
        toast('Copied to clipboard!', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: ture,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
        navigator.clipboard.writeText(text)
    }

    // Show / hide password
    const showPassword = () => {
        passwordRef.current.type = "text"
        console.log(ref.current.src)
        if (ref.current.src.includes("eye.png")) {
            ref.current.src = "icons/hidden.png";
            passwordRef.current.type = "text";
        }
        else {
            ref.current.src = "icons/eye.png";
            passwordRef.current.type = "password";
        }
    };

    // Save password

    /*const savePassword = () => {
        if (form.site.length > 3 && form.username.length > 3 && form.password.length > 3) {

            setPasswordArray([...passwordArray, { ...form, id: uuidv4() }])
            localStorage.setItem("passwords", JSON.stringify([...passwordArray, { ...form, id: uuidv4() }]))
            console.log([...passwordArray, form])
            setform({ site: "", username: "", password: "" })
            toast('Password saved!', {
        
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                
            });
        }
        else {
            toast('Error: Password not saved!',{autoClose:2000});
        }

    }*/
    const savePassword = () => {
        if (
            form.site.length > 3 &&
            form.username.length > 3 &&
            form.password.length > 3
        ) {
            // Save password
            const newPassword = { ...form, id: uuidv4() };
            setPasswordArray([...passwordArray, newPassword]);
            localStorage.setItem("passwords", JSON.stringify([...passwordArray, newPassword]));

            // Reset form fields
            setform({ site: "", username: "", password: "" });

            // ✅ Success toast (auto close after 2 seconds)
            toast.success("Password saved!", {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        } else {
            // ❌ Error toast
            toast.error("Error: Password not saved!", {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
    };


    const deletePassword = (id) => {
        console.log("Deleting password with id ", id)
        let c = confirm("Do you really want to delete this password?")
        if (c) {
            setPasswordArray(passwordArray.filter(item => item.id !== id))
            localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item => item.id !== id)))
            toast('Password Deleted!', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }

    }
    const editPassword = (id) => {

        console.log("Editing password with id ", id)
        setform(passwordArray.filter(i => i.id === id)[0])
        setPasswordArray(passwordArray.filter(item => item.id !== id))

    }

    // Handle input changes
    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value });
    };

    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition="Bounce"
                ToastContainer />
            <div className="absolute inset-0 -z-10 h-full w-80 bg-green-50 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
                <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-green-400 opacity-20 blur-[100px]"></div>
                </div>
            {/* <div className="absolute inset-0 -z-10 h-full w-full bg-green-50 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]">
                <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_800px_at_100%_200px,#d5c5ff,transparent)] rounded-full bg-green-400 opacity-20 blur-[100px] "></div>*/}


            <div className="p-3 md:mycontainer min-h-[88.2vh]">
                <h1 className="text-4xl text font-bold text-center">
                    <span className="text-green-500">&lt;</span>
                    <span>Pass</span>
                    <span className="text-green-500">OP/&gt;</span>
                </h1>
                <p className="text-green-900 text-lg text-center">Your own Password Manager</p>

                <div className="flex flex-col p-4 text-black gap-8 items-center">
                    <input
                        value={form.site}
                        onChange={handleChange}
                        placeholder="Enter website URL"
                        className="rounded-full border border-green-500 w-full p-4 py-2"
                        type="text"
                        name="site"
                        id="site"
                    />

                    <div className="flex flex-col md:flex-row w-full justify-between gap-8 relative">
                        <input
                            value={form.username}
                            onChange={handleChange}
                            placeholder="Enter username"
                            className="rounded-full border border-green-500 w-full p-4 py-2"
                            type="text"
                            name="username"
                            id="username"
                        />
                        <div className='relative'>
                            <input
                                ref={passwordRef}
                                value={form.password}
                                onChange={handleChange}
                                placeholder="Enter Password"
                                className="rounded-full border border-green-500 w-full p-4 py-2"
                                type="password"
                                name="password"
                                id="password"
                            />

                            <span
                                className="absolute right-[3px] top-[4px] cursor-pointer"
                                onClick={showPassword}
                            >
                                <img ref={ref} className="p-1" width={26} src="icons/eye.png" alt="eye" />
                            </span>
                        </div>
                    </div>
                    <button
                        onClick={savePassword}
                        className="flex justify-center items-center bg-green-400 hover:bg-green-300 rounded-full px-4 py-2 w-fit border border-green-900"
                    >
                        <lord-icon
                            src="https://cdn.lordicon.com/efxgwrkc.json"
                            trigger="hover"
                        ></lord-icon>
                        Save
                    </button>
                </div>

                <div className="passwords">
                    <h2 className="font-bold text-xl py-4">Your Passwords</h2>

                    {passwordArray.length === 0 && <div>No passwords to show</div>}

                    {passwordArray.length !== 0 && (
                        <table className="table-auto w-full rounded-md overflow-hidden md-10">
                            <thead className="bg-green-800 text-white text-center">
                                <tr>
                                    <th className="py-2">Site</th>
                                    <th className="py-2">Username</th>
                                    <th className="py-2">Password</th>
                                    <th className="py-2">Action</th>
                                </tr>
                            </thead>
                            <tbody className="bg-green-200">
                                {passwordArray.map((item, index) => (
                                    <tr key={index}>
                                        <td className=" py-2 border border-white text-center min-w-32">
                                            <a href={item.site} target="_blank" rel="noreferrer">
                                                <div className='flex items-center justify-center'></div>
                                                <span> {item.site}</span>
                                            </a>
                                            <div className='lordiconcopy size-7 cursor-pointer' onClick={() => { copyText(item.site) }} >
                                                <lord-icon
                                                    style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                    src="https://cdn.lordicon.com/iykgtsbt.json"
                                                    trigger="hover" >
                                                </lord-icon>

                                            </div>
                                        </td>

                                        <td className=" py-2 border border-white text-center min-w-32">
                                            <div className='flex items-center justify-center'></div>
                                            <span> {item.username}</span>
                                            <div className='lordiconcopy size-7 cursor-pointer' onClick={() => { copyText(item.username) }} >
                                                <lord-icon
                                                    style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                    src="https://cdn.lordicon.com/iykgtsbt.json"
                                                    trigger="hover" >
                                                </lord-icon>
                                            </div>
                                        </td>
                                        <td className=" py-2 border border-white text-center ">
                                            <div className='flex items-center justify-center'></div>
                                            <span>  {item.password}</span>
                                            <div className='lordiconcopy size-7 cursor-pointer' onClick={() => { copyText(item.password) }} >
                                                <lord-icon
                                                    style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                    src="https://cdn.lordicon.com/iykgtsbt.json"
                                                    trigger="hover" >
                                                </lord-icon>
                                            </div>
                                        </td>
                                        <td className='justify-center py-2 border border-white text-center'>
                                            <span className='cursor-pointer mx-1' onClick={() => { editPassword(item.id) }}>
                                                <lord-icon
                                                    src="https://cdn.lordicon.com/gwlusjdu.json"
                                                    trigger="hover"
                                                    style={{ "width": "25px", "height": "25px" }}>
                                                </lord-icon>
                                            </span>
                                            <span className='cursor-pointer mx-1' onClick={() => { deletePassword(item.id) }}>
                                                <lord-icon
                                                    src="https://cdn.lordicon.com/skkahier.json"
                                                    trigger="hover"
                                                    style={{ "width": "25px", "height": "25px" }}>
                                                </lord-icon>
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </>
    );
};

export default Manager;



