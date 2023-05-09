FROM public.ecr.aws/lambda/nodejs:16

# Assumes your function is named "app.js", and there is a package.json file in the app directory 
COPY app.js main_puppeteer.js package*.json  ${LAMBDA_TASK_ROOT}/

RUN yum -y install libX11 libXcomposite libXcursor libXdamage \
  libXext libXi libXtst cups-libs libXScrnSaver libXrandr alsa-lib \
  pango atk at-spi2-atk gtk3 \
  GConf2 ipa-gothic-fonts xorg-x11-fonts-100dpi xorg-x11-fonts-75dpi \
  xorg-x11-utils xorg-x11-fonts-cyrillic xorg-x11-fonts-Type1 \
  xorg-x11-fonts-misc

# Install NPM dependencies for function
RUN npm install --unsafe-perm=true --allow-root

# Set the CMD to your handler (could also be done as a parameter override outside of the Dockerfile)
CMD [ "app.handler" ]  
