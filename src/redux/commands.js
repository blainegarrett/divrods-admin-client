// Commands
import { fetchPrefs } from '../services/pref_service_client';
import { take, put, call, fork, select, all } from 'redux-saga/effects';

export function loadPreferenceData() {
    fetchPrefs()
}
