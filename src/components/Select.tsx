import { useRef, useState } from "react";

export type SelectOption = {
    label: string,
    value: string | number
}

type MultipleSelectedProp = {
    multiple: true,
    value: SelectOption[],
    onChange: (value: SelectOption[]) => void
}

type SingleSelectedProp = {
    multiple?: false,
    value?: SelectOption,
    onChange: (value: SelectOption | undefined) => void
}

type SelectProp = {
    options: SelectOption[]
} & (SingleSelectedProp | MultipleSelectedProp)


const Select = ({multiple, value, onChange, options}: SelectProp) => {
    
    const [isOpen, setIsOpen] = useState(false);
    const [hightLightedIndex, setHigthLigtedIndex] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);
    
    function clearOption() {
        multiple ? onChange([]) : onChange(undefined)
    }

    function selectOption(option: SelectOption) {
        if (multiple) {
            if(value.includes(option)){
                onChange(value.filter(o => o !== option))
            } else {
                onChange([...value, option])
            }
        }
        else {
            if (option !== value) onChange(option)
        }
    }

    function isOptionSelected(option: SelectOption) {
        return multiple ? value.includes(option) : option === value
    }

    return (
        <div 
            ref={containerRef}
            className="container" 
            tabIndex={0} 
            onClick={() => (setIsOpen((prev)=>!prev))}>
            <span className="value">{multiple ? value.map(v => (
                <button
                    className="option-badge"
                    key={v.value}
                    onClick={e => {
                        e.stopPropagation()
                        selectOption(v)
                    }}
                >
                    {v.label}
                    <span className="remove-btn">&times;</span>
                </button>
            )) : value?.label}</span>
            <button className="btn-clear" onClick={(e) => {
                e.stopPropagation()
                clearOption()
                }}>&times;</button>
            <div className="divider"></div>
            <div className="caret"></div>
            <ul className={isOpen ? "options show" : "options"}>
                {options.map((option, index: number) => (
                    <li 
                        className={(isOptionSelected(option) ? 
                            index === hightLightedIndex ? 
                            ("option selected hightlighted"): 
                            ("option selected" )
                            : 
                            index === hightLightedIndex ? 
                            ("option hightlighted"): 
                            ("option" )
                            )
                        
                        }
                        key={option.value}
                        onMouseEnter={()=>setHigthLigtedIndex(index)}
                        onMouseLeave={()=> setHigthLigtedIndex(0)}
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