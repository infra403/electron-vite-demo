关于electron打包temporal,之前老外给我的回复
```text
Thankfully, fixing this is not that difficult, though the proper solution depends on what you really wanna do. I’ll assume that your workflows are not meant to be modified after the application is packages (ie. your electron app gets packages with very specific workflows; modifying workflows require bundling and releasing a new version of your application). Ask for more details if that assumption is wrong.
In that case, you will need to make these four essential changes:

Prepare your workflow bundle BEFORE you package your Electron App. This is similar to what you have tried previously, but this must be done as a distinct build step (something like npm run bundle-workflows, or maybe as distinct task from your electron forge config, though I can’t help you with that). The important thing is that you must not be calling bundleWorkflow from your application’s code. See this example for how this can be done.
In your worker.ts file, you will need to specify your workflow bundle path (ie. workflow-bundle.js) rather than the path of your workflows.ts file. You may want to do that conditionally, eg. based on the presence of an environment variable, so that you don’t need to prebundle your workflows while developing locally. See here for an example of this.
In your electron bundler’s webpack config, you will need to exclude inclusion of the webpack package. I believe you should be able to do so by adding the following config to your webpack.main.config.ts file:
      resolve: {
        alias: {
          webpack: false,
        },
      },
4. You will need to ensure that your electron builder consider all @temporalio/* packages as externals dependencies. I don’t know exactly how this is done in electron forge, you will need to do some search for this. Just make sure you don’t get fooled by a webpack-only solution (eg. adding something like externals: { ... } in your webpack.main.config.ts, without anything else, as these packages must be included in your final application bundle.
```

在使用electron forge中，使用 https://www.npmjs.com/package/@timfish/forge-externals-plugin 打包，下面是配置
```text
    new ForgeExternalsPlugin({
      "externals": [
        "@temporalio/activity",
        "@temporalio/client",
        "@temporalio/common",
        "@temporalio/core-bridge",
        "@temporalio/proto",
        "@temporalio/worker",
        "@temporalio/workflow"
      ],
      "includeDeps": true
    }),
```
在webpack.config里面加入了下面的配置
```text
  externals: [
    "@temporalio/activity",
    "@temporalio/client",
    "@temporalio/common",
    "@temporalio/core-bridge",
    "@temporalio/proto",
    "@temporalio/worker",
    "@temporalio/workflow"
  ]
```

