import React, { useState } from 'react';
import "../css/passwordGenerator.css";
import CheckBox from './CheckBox';


const PasswordGenerator = () => {
    const [lenght, setLength] = useState(8);
    const [password, setPassword] = useState("");
    const [copied, setCopied] = useState(false);

    const [checkboxData, setCheckboxData] = useState([
        { title: "Include Uppercase Letters", state: true },
        { title: "Include Lowercase Letters", state: true },
        { title: "Include Numbers", state: true },
        { title: "Include Symbols", state: true }
    ]);
    const handleCheckboxChange = (index) => {

        const currentState = [...checkboxData];
        currentState[index].state = !currentState[index].state
        setCheckboxData(currentState)

    }

    const handleCopy = () => {
        navigator.clipboard.writeText(password);
        setCopied(true);

        setTimeout(() => {
            setCopied(false);
        }, 1000);
    };

    const generatePass = (checkBoxData, length) => {
        if (lenght < 8 || lenght > 50) {
            alert("Please Select a value between 8 and 50");
            setLength(8);
            return;
        }


        let output = "";
        let charSet = "";

        const selectedOptions = checkBoxData.filter((checkBox) => {
            return checkBox.state;

        })
        if (selectedOptions.length == 0) {
            alert("Please Select some value");
            return;
        }

        selectedOptions.forEach((option) => {

            switch (option.title) {
                case "Include Uppercase Letters":
                    charSet += "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
                    break;

                case "Include Lowercase Letters":
                    charSet += "abcdefghijklmnopqrstuvwxyz"
                    break;

                case "Include Numbers":
                    charSet += "123456789"
                    break;

                case "Include Symbols":
                    charSet += "!@#$%^&*(){}."
                    break;
            }
        })
        console.log(charSet);
        for (var i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * charSet.length)
            output += charSet[randomIndex];

        }
        setPassword(output)


    }
    return (
        <>
            <h1>Password Generator</h1>
            {password && <div className="displayAndCopy">
                <input type='text' className="password" value={password} disabled />
                <div className="copyButton">
                    
                    <button className="copyBtn" onClick={() => {
                        handleCopy()
                    }}>
                        {copied ? "Copied" : "Copy"}
                    </button>
                </div>
            </div>

            }

            <div className="titleAndLength">
                <div className="title">
                    <h5>Select Password length(**8-50 characters**)</h5>
                </div>
                <div className='lenghtOfInput'>
                    <input type="number" value={lenght} min={lenght} max="50" onChange={(e) => {
                        if (e.target.value <= 50) {
                            setLength(e.target.value)

                        }
                        else {
                            setLength(50)
                        }



                    }} />
                </div>
            </div>
            <div className="choices">

                {checkboxData.map((checkBox, index) => {
                    return (
                        <CheckBox
                            key={index}
                            title={checkBox.title}
                            onChange={() => handleCheckboxChange(index)}
                            state={checkBox.state}
                        />
                    );
                })}
            </div>
            <div className="generatePassword">
                <button className="btn" onClick={() => {
                    generatePass(checkboxData, lenght)
                }}>Generate Password</button>

            </div>
        </>


    )
}

export default PasswordGenerator