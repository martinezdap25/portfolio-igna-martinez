import { FC } from 'react';
import * as SiIcons from 'react-icons/si';
import * as BiIcons from 'react-icons/bi';
import { IconType } from 'react-icons';

interface Props {
    name: string;
    iconUrl: string;
}

const TechnologyCard: FC<Props> = ({ name, iconUrl }) => {
    const IconComponent =
        (SiIcons as Record<string, IconType>)[iconUrl] ||
        (BiIcons as Record<string, IconType>)[iconUrl];

    return (
        <div
            className="bg-white dark:bg-gray-900 rounded-xl w-[120px] h-[120px] flex flex-col items-center justify-center
                       shadow-md dark:shadow-black/40 hover:shadow-lg hover:shadow-indigo-400/50 dark:hover:shadow-indigo-500/40
                       transition-all duration-300 hover:bg-indigo-100 dark:hover:bg-indigo-700 group cursor-pointer border border-gray-200 dark:border-gray-700"
        >
            {IconComponent ? (
                <div
                    className="mb-2 text-gray-700 dark:text-gray-300 transition-transform duration-700 ease-in-out
                               group-hover:rotate-[360deg] group-hover:text-indigo-600 dark:group-hover:text-white"
                    style={{
                        transformStyle: 'preserve-3d',
                        transformOrigin: 'center',
                    }}
                >
                    <IconComponent size={36} />
                </div>
            ) : (
                <span className="text-red-500 text-3xl mb-2">❌</span>
            )}
            <span className="text-sm font-semibold text-gray-800 dark:text-gray-100 text-center">
                {name}
            </span>
        </div>
    );
};

export default TechnologyCard;
