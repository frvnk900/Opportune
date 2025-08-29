import "./style.css";
import logo from "./Icons/logo/logo-min5kb.png";
import charts from "./Icons/menu-icon/charts-icon.png";
import home from "./Icons/menu-icon/home.png";
import account from "./Icons/menu-icon/account-icon.png";
import notification from "./Icons/menu-icon/notification.png";
import poke from "./Icons/menu-icon/poke.png";
import report from "./Icons/menu-icon/report.png";
import about from "./Icons/menu-icon/account-icon.png";
import menuI from "./Icons/menu-icon/menu-icon.png";

export default function SideMenu() {
  const links = [
    { link: "Home", img: home },
    // { link: "Account", img: account },
    { link: "Charts", img: charts },
    { link: "Pokings", img: poke },
    { link: "Alerts", img: notification },
    // { link: "About", img: report },
    { link: "Report", img: report },
  ];

  return (
    <div className="horizontal-menu-container">
 

      <div className="horizontal-links">
        {links.map((value, id) => (
          <div
            key={id}
            className="horizontal-link-item"
            onClick={() => {
              if (value.link === "Home") {
                window.location.reload();  
              } else {
                console.log(`Navigating to ${value.link}`);
             
              }
            }}
          >
            <img src={value.img} alt={value.link} />
            <span>{value.link}</span>
          </div>
        ))}
      </div>
    
    </div>
  );
}
