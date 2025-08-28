
type CardProps = {
    title?: string;
    onClick?: React.MouseEventHandler<HTMLDivElement>; 
};

export default function Card({title = 'Title', onClick} : CardProps) {
    return (
        <div onClick={onClick} className='bg-red-400 h-[243px] w-[164px] grid grid-rows-[65%, 1fr] box-border relative md:bg-yellow-600 md:h-[330px] md:w-[240px] cursor-pointer'>
            <button className='bg-amber-500 absolute top-3 right-3'>del</button>
            <div className=''>image</div>
            <div className=''>{title}</div>
        </div>
    )
}
