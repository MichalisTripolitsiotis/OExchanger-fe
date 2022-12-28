export interface DefaultLayoutProps {
    children: React.ReactNode;
}

const Layout = (props: DefaultLayoutProps) => {
    return (
        <div className="container mx-auto py-1">
            {props.children}
        </div>
    )
}

export default Layout