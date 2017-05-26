import Path = require("path");

type UserArguments =
{
    build:      boolean;
    enviroment: "development"|"production";
    watch:      boolean;
    configuration:
    {
        path: string
    }
}

export = class
{
    public static resolve(args: Array<string>): UserArguments
    {
        let userArguments: UserArguments =
        {
            build:      args.includes("build"),
            watch:      args.includes("watch"),
            enviroment: args.includes("production") ? "production" : "development",
            configuration:
            {
                path: ""
            }
        };

        let index = args.indexOf("project");
        if (index > -1)
        {
            if (!args[index + 1])
                throw new Error("Invalid project path");
            let path = args[index + 1];

            if (path.endsWith("/"))
                path = path.concat("surface-project.json");

            userArguments.configuration.path = Path.resolve(process.cwd(), path);
        }

        return userArguments;
    }
}