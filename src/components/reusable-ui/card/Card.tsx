
type CardProps = {
    title?: string;
    onClick?: React.MouseEventHandler<HTMLDivElement>;
    onDelete?: () => void
};

export default function Card({title = 'Title', onClick, onDelete} : CardProps) {

    const handleClickDeleteButton = (event: React.MouseEvent<HTMLButtonElement>) => { 
        event.stopPropagation()
        {onDelete && onDelete()}
     }

    return (
        <div onClick={onClick} className='bg-red-400 h-[243px] w-[164px] grid grid-rows-[65%, 1fr] box-border relative md:bg-yellow-600 md:h-[330px] md:w-[240px] cursor-pointer'>
            {onDelete && 
                <button 
                    className='bg-amber-500 absolute top-3 right-3 cursor-pointer hover:text-red-500' 
                    onClick={handleClickDeleteButton}           
                >
                    del
                </button>}
            <div className=''>image</div>
            <div className=''>{title}</div>
        </div>
    )
}
