import { useState } from "react";

type SelectOption = {
    label: string,
    value: number
}

type SelectProp = {
    options: SelectOption[],
    value?: SelectOption,
    onChange: (value: SelectOption | undefined) => void
}


const Select = ({value, onChange, options}: SelectProp) => {
    
    const [isOpen, setIsOpen] = useState(false);
    
    function clearOption() {
        onChange(undefined)
    }

    function selectOption(option: SelectOption) {
        onChange(option)
    }

    function isOptionSelected(option: SelectOption) {
        return option === value
    }

    return (
        <div className="container" tabIndex={0} onClick={() => (setIsOpen((prev)=>!prev))}>
            <span className="value">{value?.label}</span>
            <button className="btn-clear" onClick={(e) => {
                e.stopPropagation()
                clearOption()
                }}>&times;</button>
            <div className="divider"></div>
            <div className="caret"></div>
            <ul className={isOpen ? "options show" : "options"}>
                {options.map(option => (
                    <li 
                        className={isOptionSelected(option) ? "option selected" : "option" }
                        key={option.label}
                        onClick={(e)=>{
                            e.stopPropagation()
                            selectOption(option)
                            setIsOpen(false)
                        }}
                    >{option.label}
                    </li>
                ) )}
            </ul>
        </div>
    );
};

export default Select;