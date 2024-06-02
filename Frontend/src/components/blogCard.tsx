import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface BlogCardProps {
  title : string
  description : string
  toLink : string
}

export const BlogCard : React.FC<BlogCardProps> = ({title,description,toLink}) => {

    return (
      <div className="w-1/2 border border-slate-400 rounded-2xl hover:shadow-xl p-5 my-4">
        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white mb-2">
          {title}
        </h5>
        <p className="font-normal text-gray-700 dark:text-gray-400">
          {description.slice(0,50)}...
        </p>
        <Button className="my-4">
          <Link to={toLink}>
          Read more
          </Link>
          <svg className="-mr-1 ml-2 h-4 w-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path
              fillRule="evenodd"
              d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </Button>
      </div>
    );
  }