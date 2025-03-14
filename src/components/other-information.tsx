import { ExternalIds, SpokenLanguage } from "@/services/models/movie.model";
import { BiLogoImdb } from "react-icons/bi";
import {
  RiFacebookCircleFill,
  RiInstagramLine,
  RiLink,
  RiTiktokFill,
  RiTwitterXFill,
  RiYoutubeFill,
} from "react-icons/ri";

interface InfoProps {
  info: ExternalIds;
  status: string;
  revenue?: number;
  budget?: number;
  homePageLink: string;
  language: SpokenLanguage[];
}

const OtherInformation = ({
  info,
  status,
  revenue,
  budget,
  homePageLink,
  language,
}: InfoProps) => {
  const formattedNumber = (num: number) => {
    return num.toLocaleString();
  };
  return (
    <div className="py-8">
      <h2 className="pb-6 uppercase text-[2.5rem] font-bold">
        Other Information
      </h2>

      <div className="grid  sm:grid-cols-2 items-center order-0">
        <div className="grid gap-y-6">
          {/* {info ? <h6 className="text-[1.8rem]  font-bold">Social Links</h6> : ""} */}

          <div className="flex items-center gap-8 ">
            {homePageLink && (
              <div className="">
                <a href={`${homePageLink}`} target="_blank">
                  <RiLink size={30} />
                </a>
              </div>
            )}
            {info?.instagram_id && (
              <div className="">
                <a
                  href={`https://www.instagram.com/${info.instagram_id}`}
                  target="_blank"
                >
                  {" "}
                  <RiInstagramLine size={30} />
                </a>
              </div>
            )}

            {info?.twitter_id && (
              <div className="social-link">
                <a
                  href={`https://www.twitter.com/${info.twitter_id}`}
                  target="_blank"
                >
                  <RiTwitterXFill size={30} />
                </a>
              </div>
            )}

            {info?.facebook_id && (
              <div className="social-link">
                <a
                  href={`https://www.facebook.com/${info.facebook_id}`}
                  target="_blank"
                >
                  <RiFacebookCircleFill size={30} />
                </a>
              </div>
            )}

            {info?.tiktok_id && (
              <div className="social-link">
                <a
                  href={`https://www.tiktok.com/${info.tiktok_id}`}
                  target="_blank"
                >
                  <RiTiktokFill size={30} />
                </a>
              </div>
            )}

            {info?.imdb_id && (
              <div className="social-link">
                <a
                  href={`https://www.imdb.com/title/${info.imdb_id}`}
                  target="_blank"
                >
                  <BiLogoImdb size={30} />
                </a>
              </div>
            )}

            {info?.youtube_id && (
              <div className="social-link">
                <a
                  href={`https://www.youtube.com/${info.youtube_id}`}
                  target="_blank"
                >
                  <RiYoutubeFill size={30} />
                </a>
              </div>
            )}
          </div>
        </div>
        <div className="flex gap-16 flex-wrap">
          {language?.length > 0 && (
            <div className="flex flex-col gap-y-2">
              <h6 className="text-[1.8rem]  font-bold">Spoken Languages</h6>
              {language.map((lang) => (
                <div className="flex">
                  <p
                    className="text-[1.3rem] font-light "
                    key={lang?.iso_639_1}
                  >
                    {lang?.name}
                  </p>
                </div>
              ))}
            </div>
          )}
          {status && (
            <div className="flex flex-col gap-y-2">
              <h6 className="text-[1.8rem]  font-bold">Status</h6>
              <p className="text-[1.3rem] font-light ">{status}</p>
            </div>
          )}

          {budget && (
            <div className="flex flex-col gap-y-2">
              <h6 className="text-[1.8rem]  font-bold">Budget</h6>
              <p className="text-[1.3rem] font-light">
                ${formattedNumber(budget)}
              </p>
            </div>
          )}

          {revenue ? (
            <div className="flex flex-col gap-y-2">
              <h6 className="text-[1.6rem]  font-bold">Revenue</h6>
              <p className="text-[1.3rem] font-light">
                ${formattedNumber(revenue)}
              </p>
            </div>
          ) : (
            "-"
          )}
        </div>
      </div>
    </div>
  );
};

export default OtherInformation;
