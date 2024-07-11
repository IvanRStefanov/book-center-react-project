export default function HeaderUserUtils({logedInUser}) {
    console.log(logedInUser)
    return (
        <div className="header__user-utils">
            <a href="#" className="user-utils ico-background">
                <img src={logedInUser.imageUrl} alt="" />
            </a>
        </div>
    );
}