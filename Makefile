PYTHON_SITE_PACKAGES_PATH := \
	$(shell python -c "from distutils.sysconfig import get_python_lib; print(get_python_lib())")

help:
	@echo "TODO: Write the install help"

install:
	#npm install
	cp ./.env.local_template ./.env.local

run:
	dev_appserver.py . --port=8080 --admin_port=8081

build:
	npm run build

dev:
	npm run start
deploy:
	appcfg.py update -A divrods-admin -V $(filter-out $@,$(MAKECMDGOALS)) ./app.yaml
