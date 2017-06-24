PYTHON_SITE_PACKAGES_PATH := \
	$(shell python -c "from distutils.sysconfig import get_python_lib; print(get_python_lib())")

help:
	@echo "TODO: Write the install help"

clean:
	find . -name '*.pyc' -exec rm -f {} +
	find . -name '*.pyo' -exec rm -f {} +
	find . -name '*~' -exec rm -f {} +

linklibs:
	linkenv $(PYTHON_SITE_PACKAGES_PATH) app/external

install:
	pip install -Ur requirements_dev.txt
	linkenv $(PYTHON_SITE_PACKAGES_PATH) app/external
	@echo "Yay! Everything installed."


unit:
ifeq ($(filter-out $@,$(MAKECMDGOALS)), "")
	@echo "Running all unit tests"
else
	@echo "Running only tests in $(filter-out $@,$(MAKECMDGOALS))"
endif
	nosetests -sv -a is_unit --with-gae --gae-application=app  --gae-lib-root=$(GAE_PYTHONPATH) --with-yanc --logging-level=ERROR $(filter-out $@,$(MAKECMDGOALS))

integrations:
ifeq ($(filter-out $@,$(MAKECMDGOALS)), "")
	@echo "Running all integration tests"
else
	@echo "Running only integration tests in $(filter-out $@,$(MAKECMDGOALS))"
endif
	nosetests -sv --with-gae --gae-application=app --with-yanc $(filter-out $@,$(MAKECMDGOALS))


coverage:
ifeq ($(filter-out $@,$(MAKECMDGOALS)), "")
	@echo "Generating coverage for all unit tests"
else
	@echo "Generating coverage only for tests in $(filter-out $@,$(MAKECMDGOALS))"
endif
	nosetests -sv --with-gae --gae-application=app --with-yanc --with-coverage  --cover-package=app --cover-erase --cover-html $(filter-out $@,$(MAKECMDGOALS))


run:
	dev_appserver.py . --port=3500 --admin_port=3550

#dispatch:
#	appcfg.py -A arts-612 update_dispatch .

deploy:
	appcfg.py update -A divining-admin -V $(filter-out $@,$(MAKECMDGOALS)) ./app.yaml

deploy_prod:
	appcfg.py update -A divining-admin -V $(filter-out $@,$(MAKECMDGOALS)) ./app.yaml