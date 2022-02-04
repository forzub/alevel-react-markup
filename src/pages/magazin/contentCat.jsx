import { Typography } from "antd";
import CatCard from "../../components/card";


const ContentCat = ({ current }) => {


  return (
    <>
      <Typography style={{ display: 'flex', flexWrap: 'wrap', }}>
        {
          ('items' in current) && (current.items.length > 0) ?
            current.items.map(el =>
              <div className="card-col" key={`cardCol_${el.id}`}>
                <CatCard el={el} />
              </div>
            ) 
            : null
        }
      </Typography>

    </>
  );
}

export default ContentCat;