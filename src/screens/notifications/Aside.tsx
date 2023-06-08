import React from 'react';
import Filter from "../../components/filter/Filter";

interface AsideProps {
    setFilters: React.Dispatch<React.SetStateAction<string[]>>
}

const Aside = ({setFilters}: AsideProps) => {
    return (
        <aside className="aside">
            <Filter
                title='Status'
                list={[
                    { label: "All", default: true, value: 'all' },
                    { label: "Pending", default: true, value: 'pending' },
                    { label: "Waiting", default: false, value: 'waiting' },
                    { label: "Completed", default: false, value: 'completed' },
                    { label: "Error", default: false, value: 'error' },
                ]}
                onSelect={setFilters}
            />
        </aside>
    );
};

export default Aside;
