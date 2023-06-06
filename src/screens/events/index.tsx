import "./styles.sass";

import React, { FC, useState } from "react";
import { useStore } from "../../context/StoreContext";
import { observer } from "mobx-react-lite";
import FilterBar from "./filterBar/FilterBar";
import EventForm from "./eventForm/EventForm";
import OptionsMenu from "./optionsMenu/OptionsMenu";
import Emptiness from "../../components/UI/emptiness_/Emptiness";
import AddButton from "../../components/UI/addButton/AddButton";
import SearchInput from "../../components/UI/searchInput/SearchInput";
import MenuDropdown from "../../components/UI/menuDropdown/MenuDropdown";
import StatItem from "../../components/statItem/statItem";
import coverEmpty from "../../assets/images/preview-empty.png";
import coverImg from "../../assets/images/preview.png";

const Events: FC = () => {
  const { events } = useStore();

  const [showForm, setShowForm] = useState(false);
  const [showOptionsMenu, setShowOptionsMenu] = useState(false);
  const [editingEvent, setEditingEvent] = useState();

  const handleShowForm = () => {
    setShowForm((prev) => !prev);
  };

  const handleShowOptionsMenu = () => {
    setShowOptionsMenu((prev) => !prev);
  };

  const event = {
    title: "Фитнес. Поддержка оздоровительного центра",
    place: "Площадь главного Еврея, д.1",
    date: "22.02.2012",
    time: "22:22",
    cover: "",
    text: "Закон и порядок являются ключевыми аспектами израильской системы правосудия. Израиль, как демократическое государство, придерживается принципа, что все граждане равны перед законом и имеют право на справедливое судебное разбирательство",
  }


    return (
        <>
            <FilterBar disabled={false} />
            <EventForm showForm={showForm} onCloseForm={handleShowForm} event={event}/>
            <OptionsMenu showMenu={showOptionsMenu} onCloseMenu={handleShowOptionsMenu}/>

            <div className="container events">
              <div className="events-container upcoming-events">
                <div className="title">Ближайшие мероприятия</div>
                <div className="month-events">
                  <div className="top">
                    <button className="arrow-btn">
                      <span className="arrow _icon-ico-arrow-s"></span> 
                    </button>
                    <span className="monthYear">Декабрь, 2022</span>
                    <span className="eventsCount">4 Событий</span>
                  </div>
                  <div className="events-wrapper">
                    <div className="event">
                      <div className="img-container">
                        <img src={coverEmpty} alt="cover"></img>
                      </div>
                      <div className="text">
                        <div className="event-title">Получение гражданства</div>
                        <div className="event-info">22.12.2022 - 10:00 Хайфа, пл. городская. д. 3</div>
                      </div>
                      <button onClick={handleShowOptionsMenu} className="menu-btn"><span className="_icon-ico-menu"></span></button>
                    </div>
                    <div className="event">
                      <div className="img-container">
                        <img src={coverEmpty} alt="cover"></img>
                      </div>
                      <div className="text">
                        <div className="event-title">Получение гражданства</div>
                        <div className="event-info">22.12.2022 - 10:00 Хайфа, пл. городская. д. 3</div>
                      </div>
                      <button className="menu-btn"><span className="_icon-ico-menu"></span></button>
                    </div>
                    <div className="event">
                      <div className="img-container">
                        <img src={coverEmpty} alt="cover"></img>
                      </div>
                      <div className="text">
                        <div className="event-title">Получение гражданства</div>
                        <div className="event-info">22.12.2022 - 10:00 Хайфа, пл. городская. д. 3</div>
                      </div>
                      <button className="menu-btn"><span className="_icon-ico-menu"></span></button>
                    </div>
                    <div className="event">
                      <div className="img-container">
                        <img src={coverEmpty} alt="cover"></img>
                      </div>
                      <div className="text">
                        <div className="event-title">Получение гражданства</div>
                        <div className="event-info">22.12.2022 - 10:00 Хайфа, пл. городская. д. 3</div>
                      </div>
                      <button className="menu-btn"><span className="_icon-ico-menu"></span></button>
                    </div>
                    <div className="event">
                      <div className="img-container">
                        <img src={coverEmpty} alt="cover"></img>
                      </div>
                      <div className="text">
                        <div className="event-title">Получение гражданства</div>
                        <div className="event-info">22.12.2022 - 10:00 Хайфа, пл. городская. д. 3</div>
                      </div>
                      <button className="menu-btn"><span className="_icon-ico-menu"></span></button>
                    </div>                                                                              
                  </div>
                </div>
              </div>
              <div className="events-container all-events">
                <div className="title">Все мероприятия</div>
                <div className="month-events">
                  <div className="top">
                    <button className="arrow-btn">
                      <span className="arrow _icon-ico-arrow-s"></span> 
                    </button>
                    <span className="monthYear">Декабрь, 2022</span>
                    <span className="eventsCount">4 Событий</span>
                  </div>
                  <div className="events-wrapper">
                    <div className="event">
                      <div className="img-container">
                        <img src={coverEmpty} alt="cover"></img>
                      </div>
                      <div className="text">
                        <div className="event-title">Получение гражданства</div>
                        <div className="event-info">22.12.2022 - 10:00 Хайфа, пл. городская. д. 3</div>
                      </div>
                      <button className="menu-btn"><span className="_icon-ico-menu"></span></button>
                    </div>
                    <div className="event">
                      <div className="img-container">
                        <img src={coverEmpty} alt="cover"></img>
                      </div>
                      <div className="text">
                        <div className="event-title">Получение гражданства</div>
                        <div className="event-info">22.12.2022 - 10:00 Хайфа, пл. городская. д. 3</div>
                      </div>
                      <button className="menu-btn"><span className="_icon-ico-menu"></span></button>
                    </div>
                    <div className="event">
                      <div className="img-container">
                        <img src={coverEmpty} alt="cover"></img>
                      </div>
                      <div className="text">
                        <div className="event-title">Получение гражданства</div>
                        <div className="event-info">22.12.2022 - 10:00 Хайфа, пл. городская. д. 3</div>
                      </div>
                      <button className="menu-btn"><span className="_icon-ico-menu"></span></button>
                    </div>
                    <div className="event">
                      <div className="img-container">
                        <img src={coverEmpty} alt="cover"></img>
                      </div>
                      <div className="text">
                        <div className="event-title">Получение гражданства</div>
                        <div className="event-info">22.12.2022 - 10:00 Хайфа, пл. городская. д. 3</div>
                      </div>
                      <button className="menu-btn"><span className="_icon-ico-menu"></span></button>
                    </div>
                    <div className="event">
                      <div className="img-container">
                        <img src={coverEmpty} alt="cover"></img>
                      </div>
                      <div className="text">
                        <div className="event-title">Получение гражданства</div>
                        <div className="event-info">22.12.2022 - 10:00 Хайфа, пл. городская. д. 3</div>
                      </div>
                      <button className="menu-btn"><span className="_icon-ico-menu"></span></button>
                    </div>
                    <div className="event">
                      <div className="img-container">
                        <img src={coverEmpty} alt="cover"></img>
                      </div>
                      <div className="text">
                        <div className="event-title">Получение гражданства</div>
                        <div className="event-info">22.12.2022 - 10:00 Хайфа, пл. городская. д. 3</div>
                      </div>
                      <button className="menu-btn"><span className="_icon-ico-menu"></span></button>
                    </div>
                    <div className="event">
                      <div className="img-container">
                        <img src={coverEmpty} alt="cover"></img>
                      </div>
                      <div className="text">
                        <div className="event-title">Получение гражданства</div>
                        <div className="event-info">22.12.2022 - 10:00 Хайфа, пл. городская. д. 3</div>
                      </div>
                      <button className="menu-btn"><span className="_icon-ico-menu"></span></button>
                    </div>                                                                               
                  </div>
                </div>
                <div className="month-events">
                  <div className="top">
                    <button className="arrow-btn">
                      <span className="arrow _icon-ico-arrow-s"></span> 
                    </button>
                    <span className="monthYear">Декабрь, 2022</span>
                    <span className="eventsCount">4 Событий</span>
                  </div>
                  <div className="events-wrapper">
                    <div className="event">
                      <div className="img-container">
                        <img src={coverEmpty} alt="cover"></img>
                      </div>
                      <div className="text">
                        <div className="event-title">Получение гражданства</div>
                        <div className="event-info">22.12.2022 - 10:00 Хайфа, пл. городская. д. 3</div>
                      </div>
                      <button className="menu-btn"><span className="_icon-ico-menu"></span></button>
                    </div>
                    <div className="event">
                      <div className="img-container">
                        <img src={coverEmpty} alt="cover"></img>
                      </div>
                      <div className="text">
                        <div className="event-title">Получение гражданства</div>
                        <div className="event-info">22.12.2022 - 10:00 Хайфа, пл. городская. д. 3</div>
                      </div>
                      <button className="menu-btn"><span className="_icon-ico-menu"></span></button>
                    </div>
                    <div className="event">
                      <div className="img-container">
                        <img src={coverEmpty} alt="cover"></img>
                      </div>
                      <div className="text">
                        <div className="event-title">Получение гражданства</div>
                        <div className="event-info">22.12.2022 - 10:00 Хайфа, пл. городская. д. 3</div>
                      </div>
                      <button className="menu-btn"><span className="_icon-ico-menu"></span></button>
                    </div>
                    <div className="event">
                      <div className="img-container">
                        <img src={coverEmpty} alt="cover"></img>
                      </div>
                      <div className="text">
                        <div className="event-title">Получение гражданства</div>
                        <div className="event-info">22.12.2022 - 10:00 Хайфа, пл. городская. д. 3</div>
                      </div>
                      <button className="menu-btn"><span className="_icon-ico-menu"></span></button>
                    </div>
                    <div className="event">
                      <div className="img-container">
                        <img src={coverEmpty} alt="cover"></img>
                      </div>
                      <div className="text">
                        <div className="event-title">Получение гражданства</div>
                        <div className="event-info">22.12.2022 - 10:00 Хайфа, пл. городская. д. 3</div>
                      </div>
                      <button className="menu-btn"><span className="_icon-ico-menu"></span></button>
                    </div>
                    <div className="event">
                      <div className="img-container">
                        <img src={coverEmpty} alt="cover"></img>
                      </div>
                      <div className="text">
                        <div className="event-title">Получение гражданства</div>
                        <div className="event-info">22.12.2022 - 10:00 Хайфа, пл. городская. д. 3</div>
                      </div>
                      <button className="menu-btn"><span className="_icon-ico-menu"></span></button>
                    </div>
                    <div className="event">
                      <div className="img-container">
                        <img src={coverEmpty} alt="cover"></img>
                      </div>
                      <div className="text">
                        <div className="event-title">Получение гражданства</div>
                        <div className="event-info">22.12.2022 - 10:00 Хайфа, пл. городская. д. 3</div>
                      </div>
                      <button className="menu-btn"><span className="_icon-ico-menu"></span></button>
                    </div>                                                                               
                  </div>
                </div>
              </div>
            </div>

            {/* <Emptiness addBtnText="Добавить меропритяие" className="no-events" onClick={handleShowForm}/> */}
            <AddButton onClick={handleShowForm} />
        </>
    );
};

export default observer(Events);

